import { oai } from "@/lib/ai/openai";
import { NextRequest, NextResponse } from "next/server";
import { content } from "./promt";
import type { IRequestDocCode } from "@/types/shared.types";
export const runtime = "edge";
const map = {
  low: { max_output_tokens: 400, temperature: 0 },
  medium: { max_output_tokens: 1200, temperature: 0 },
  high: { max_output_tokens: 3000, temperature: 0 },
} as const;

export async function POST(req: NextRequest) {
  try {
    const { code, level } = (await req.json()) as IRequestDocCode;
    if (!code)
      return NextResponse.json({ error: "Missing code" }, { status: 400 });

    const resp = await oai.responses.create(
      {
        model: "gpt-5-nano",
        input: [
          {
            role: "developer",
            content: content + code,
          },
          { role: "user", content: code },
        ],
        max_output_tokens: 4000,
      },
      {
        signal: req.signal,
      }
    );

    return NextResponse.json(
      { response: resp.output_text ?? "", tokens: resp.usage?.total_tokens },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
