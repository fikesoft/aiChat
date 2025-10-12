import OpenAI from "openai";
import { oai } from "@/lib/ai/openai";
export async function POST(req: Request) {
  const message = req.body;
  const response = oai.responses.create({
    model: "gpt-5-nano",
  });
}
