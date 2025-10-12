// app/api/doc-code/route.ts
import { oai } from "@/lib/ai/openai";

export const runtime = "edge"; // or omit for Node

type Body = { code: string };

export async function POST(req: Request) {
  const { code } = (await req.json()) as Body;
  if (!code) return new Response("Missing code", { status: 400 });

  const resp = await oai.responses.create({
    model: "gpt-5-nano",
    input: [
      {
        role: "developer",
        content: [
          "Rewrite by ADDING documentation only.",
          "Preserve semantics and formatting.",
          "Style: JSDoc for functions, params, returns.",
          "No explanations. No extra text.",
        ].join("\n"),
      },
      { role: "user", content: code },
    ],
    // temperature: 0.1,
  });

  return new Response(resp, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
