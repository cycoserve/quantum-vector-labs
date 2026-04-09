import { createTextStreamResponse } from "ai";

export const runtime = "nodejs";

const SYSTEM_PROMPT = `You are a helpful assistant for CycoServe Labs (Cy).

CycoServe Labs offers:
- Serverless Inference: Deploy GenAI models globally across six continents — no infrastructure to manage, self-optimizing.
- Vector Databases: Private, secure vector DBs for RAG — custom AI outputs without model training.
- Multi-Modal Models: Inference-optimized GPU-backed models.
- Custom Gen AI Apps: AI-powered apps for mobile, web, and internal tools.
- OpenAI-compatible API: Easy integration at an affordable rate.

IMPORTANT: Do NOT use any markdown formatting in your responses. This means:
- Do NOT use **bold** or *italic* text
- Do NOT use bullet points with - or *
- Do NOT use numbered lists
- Do NOT use backticks for code or URLs
- Do NOT use any markdown syntax at all

When you need to mention a URL, just write it as plain text: https://api.qvlabs.ai/v1/completions

Rules:
- Use a casual, professional tone — like a peer on Slack.
- Never start with "Based on the documents provided..." or "Certainly!" or "Great question!"
- Give short, direct answers. If a 1-sentence answer works, use it.
- If you don't know, just say "Not sure about that one yet."
- Keep responses under 3 sentences unless the user asks for detail.`;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await fetch(process.env.VULTR_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.VULTR_API_KEY}`,
    },
    body: JSON.stringify({
      model: process.env.VULTR_MODEL ?? "deepseek-r1-distill-qwen-32b",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages,
      ],
      stream: true,
      max_tokens: 150,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    return new Response(`API Error: ${error}`, { status: response.status });
  }

  const decoder = new TextDecoder();

  // Parse the Vultr SSE stream and emit plain text chunks
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
