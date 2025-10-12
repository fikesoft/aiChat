import { oai } from "@/lib/ai/openai";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

type Body = { code: string };

export async function POST(req: NextRequest) {
  try {
    const { code } = (await req.json()) as Body;
    if (!code)
      return NextResponse.json({ error: "Missing code" }, { status: 400 });

    const resp = await oai.responses.create({
        background: ,
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
      max_output_tokens: 4000,
    });

    return NextResponse.json({ response: resp }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
