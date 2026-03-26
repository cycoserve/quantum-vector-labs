import { createTextStreamResponse } from "ai";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { messages, formContext } = await req.json();

  const fullSystemPrompt = `You are the Quantum Vector Labs (QVL) Support Assistant.
Your goal is to help users resolve issues with QVL software, including NPM packages, GitHub repositories, and the online hosted platform.

CORE INSTRUCTIONS:
- You have been provided with a support request. ANALYZE the details below and provide a solution immediately. 
- NEVER ask the user for their name, email, or issue description, as they are listed below. 
- You have FULL ACCESS to the user's form submission.
- Be technical but accessible. If you can provide a code snippet or a step-by-step guide, do so.
- If you are UNABLE to solve the issue after a few attempts, or if the user asks for a human, you MUST provide the support email: support@quantumvectorlabs.com.
- Do NOT use any markdown formatting except for code blocks. NO bold/italics/bullets. Just plain text.

USER SUPPORT REQUEST CONTEXT:
-------------------------------
Name: ${formContext.name}
Email: ${formContext.email}
Issue Type: ${formContext.issueType}
Description: ${formContext.description}
-------------------------------

Rules:
- Professional, Slack-like tone.
- Short, direct answers.
- If you don't know, say "I'm not sure, but let me connect you with a human expert." and give the email.
- Keep responses concise.`;

  const response = await fetch(process.env.VULTR_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.VULTR_API_KEY}`,
    },
    body: JSON.stringify({
      model: process.env.VULTR_MODEL ?? "deepseek-r1-distill-qwen-32b",
      messages: [
        { role: "system", content: fullSystemPrompt },
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
