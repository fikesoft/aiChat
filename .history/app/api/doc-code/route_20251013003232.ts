import { oai } from "@/lib/ai/openai";
import { NextRequest, NextResponse } from "next/server";
import { lowTokenConsumption, mediumHighTokenConsumption } from "./promt";
import type { IRequestDocCode } from "@/types/shared.types";
export const runtime = "edge";
const tokenConsumptionMap = {
  low: { max_output_tokens: 400, temperature: 0 },
  medium: { max_output_tokens: 1200, temperature: 0 },
  high: { max_output_tokens: 3000, temperature: 0 },
} as const;

const promtMap = {
  low: { content: lowTokenConsumption },
  medium: { content: mediumHighTokenConsumption },
  high: { content: mediumHighTokenConsumption },
} as const;
export async function POST(req: NextRequest) {
  try {
    const { code, level } = (await req.json()) as IRequestDocCode;
    if (!code)
      return NextResponse.json({ error: "Missing code" }, { status: 400 });
    const tokenConsumptionObject =
      tokenConsumptionMap[level] ?? tokenConsumptionMap.medium;

    const resp = await oai.responses.create(
      {
        model: "gpt-5-nano",
        input: [
          {
            role: "developer",
            content: lowTokenConsumption,
          },
          { role: "user", content: code },
        ],
        ...tokenConsumptionObject,
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
