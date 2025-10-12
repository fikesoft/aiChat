import { oai } from "@/lib/ai/openai";
import { NextRequest, NextResponse } from "next/server";
import { content } from "./promt";

type Body = { code: string };
export const runtime = "edge";
export async function POST(req: NextRequest) {
  try {
    const { code } = (await req.json()) as Body;
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
      { response: resp.output_text ?? "" , tokens: resp.},
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
