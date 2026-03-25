import { createTextStreamResponse } from "ai";

export const runtime = "nodejs";

const SUPPORT_SYSTEM_PROMPT = `You are the Quantum Vector Labs (QVL) Support Assistant.
Your goal is to help users resolve issues with QVL software, including NPM packages, GitHub repositories, and the online hosted platform.

Core Knowledge:
- NPM/GitHub: Helping with installation, configuration, and troubleshooting of QVL packages.
- Software Usage: Explaining how to use QVL's Serverless Inference, Vector Databases, and AI agent clusters.
- Hosted Platform: Assisting with dashboard navigation, API key management, and deployment issues.

Instructions:
- Use the context provided in the user's initial support request form to offer a specific solution.
- Be technical but accessible. If you can provide a code snippet or a step-by-step guide, do so.
- If you are UNABLE to solve the issue after a few attempts, or if the user asks for a human, you MUST provide the support email: support@quantumvectorlabs.com.
- Do NOT use any markdown formatting except for code blocks if absolutely necessary (though the UI might not support it well, the request says no markdown in the other chatbot).
- Actually, keep it consistent with the main chatbot: NO markdown bold/italics/bullets. Just plain text.

Rules:
- Professional, Slack-like tone.
- Short, direct answers.
- If you don't know, say "I'm not sure, but let me connect you with a human expert." and give the email.
- Keep responses concise.`;

export async function POST(req: Request) {
  const { messages, formContext } = await req.json();

  // Inject form context into the first message or as a system message
  const contextMessage = {
    role: "system",
    content: `User Support Request Context:
Name: ${formContext.name}
Email: ${formContext.email}
Issue Type: ${formContext.issueType}
Description: ${formContext.description}`,
  };

  const response = await fetch(process.env.VULTR_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.VULTR_API_KEY}`,
    },
    body: JSON.stringify({
      model: process.env.VULTR_MODEL ?? "deepseek-r1-distill-qwen-32b",
      messages: [
        { role: "system", content: SUPPORT_SYSTEM_PROMPT },
        contextMessage,
        ...messages,
      ],
      stream: true,
      max_tokens: 500,
      temperature: 0.5,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    return new Response(`API Error: ${error}`, { status: response.status });
  }

  const decoder = new TextDecoder();

  const textStream = new ReadableStream<string>({
    async start(controller) {
      const reader = response.body!.getReader();
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n").filter((line) => line.trim() !== "");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") {
                controller.close();
                return;
              }
              try {
                const parsed = JSON.parse(data);
                const content = parsed.choices?.[0]?.delta?.content;
                if (content) {
                  controller.enqueue(content);
                }
              } catch {
                // skip malformed JSON
              }
            }
          }
        }
        controller.close();
      } catch (err) {
        controller.error(err);
      } finally {
        reader.releaseLock();
      }
    },
  });

  return createTextStreamResponse({ textStream });
}
