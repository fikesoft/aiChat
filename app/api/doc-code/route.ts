import { oai } from "@/lib/ai/openai";
import { NextRequest, NextResponse } from "next/server";
import { lowTokenConsumption, mediumHighTokenConsumption } from "./promt";
import type { IRequestDocCode } from "@/types/shared.types";
export const runtime = "edge";

const tokenConsumptionMap = {
  low: { max_output_tokens: 10000 },
  medium: { max_output_tokens: 15000 },
  high: { max_output_tokens: 17000 },
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
    const promtObject = promtMap[level] ?? promtMap.medium;

    const resp = await oai.responses.create(
      {
        model: "gpt-5-nano",
        reasoning: {
          effort: "medium",
        },
        input: [
          {
            role: "system",
            ...promtObject,
          },
          { role: "user", content: code },
        ],
        ...tokenConsumptionObject,
      },
      {
        signal: req.signal,
      }
    );
    console.log(resp);
    if (resp.usage?.output_tokens === 0) {
      throw new Error("Model returned 0 output tokens. Try again later");
    }
    if (resp.status == "incomplete") {
      throw new Error(resp.incomplete_details?.reason ?? "Unknown error");
    }
    return NextResponse.json(
      { response: resp.output_text, tokens: resp.usage?.total_tokens },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
