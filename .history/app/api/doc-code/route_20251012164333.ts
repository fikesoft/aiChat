import OpenAI from "openai";
import { oai } from "@/lib/ai/openai";
export async function POST(req: Request) {
  const message = req.body;
  const response = oai.responses.create({
    model: "gpt-5-nano",
    input: [
      {
        role: "",
        content: [
          "Rewrite by ADDING documentation only.",
          "Preserve semantics and formatting.",
          "Output ONLY one fenced block: ```ts\\n...\\n```",
          "Style: JSDoc for functions, params, returns.",
          "No explanations. No extra text.",
        ].join("\n"),
      },
      { role: "user", content: message },
    ],
  });
}
