// app/api/doc-code/route.ts
import { NextRequest, NextResponse } from "next/server";
import { oai } from "@/lib/ai/openai";
import { lowTokenConsumption, mediumHighTokenConsumption } from "./promt";
import type { IRequestDocCode } from "@/types/shared.types";

export const runtime = "edge";

function corsHeaders(req: NextRequest) {
  const origin = req.headers.get("origin") ?? "*";
  return {
    "Access-Control-Allow-Origin": origin,
    Vary: "Origin",
    "Access-Control-Allow-Methods": "POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(req) });
}

const tokenConsumptionMap = {
  low: { max_output_tokens: 400 },
  medium: { max_output_tokens: 1200 },
  high: { max_output_tokens: 3000 },
} as const;

const promtMap = {
  low: { content: lowTokenConsumption },
  medium: { content: mediumHighTokenConsumption },
  high: { content: mediumHighTokenConsumption },
} as const;

export async function POST(req: NextRequest) {
  try {
    const { code, level } = (await req.json()) as IRequestDocCode;
    if (!code) {
      return NextResponse.json(
        { error: "Missing code" },
        { status: 400, headers: corsHeaders(req) }
      );
    }

    const tokenConsumptionObject =
      tokenConsumptionMap[level as keyof typeof tokenConsumptionMap] ??
      tokenConsumptionMap.medium;
    const promtObject =
      promtMap[level as keyof typeof promtMap] ?? promtMap.medium;

    const resp = await oai.responses.create(
      {
        model: "gpt-5-nano",
        input: [
          { role: "developer", ...promtObject },
          { role: "user", content: code },
        ],
        ...tokenConsumptionObject,
      },
      { signal: req.signal }
    );

    return NextResponse.json(
      { response: resp.output_text, tokens: resp.usage?.total_tokens },
      { status: 200, headers: corsHeaders(req) }
    );
  } catch (err) {
    return NextResponse.json(
      { error: String(err) },
      { status: 500, headers: corsHeaders(req) }
    );
  }
}
