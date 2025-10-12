import OpenAI from "openai";
import { oai } from "@/lib/ai/openai";
export async function POST(req: Request) {
  const message = req.body;
  if (!code) return new Response("Missing code", { status: 400 });
  const resp = await oai.responses.create({
    model: "gpt-5-nano",
    input: [
      {
        role: "developer",
        content: [
          "Rewrite by ADDING documentation only.",
          "Preserve semantics and formatting.",
          `Output ONLY one fenced block: \`\`\`${lang}\\n...\\n\`\`\``,
          "Style: JSDoc for functions, params, returns.",
          "No explanations. No extra text.",
        ].join("\n"),
      },
      { role: "user", content: message },
    ],
    // temperature: 0.1,
  });
}
