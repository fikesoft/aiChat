// app/api/doc-code/route.ts
import { oai } from "@/lib/ai/openai";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const DEV = [
  "Return ONLY JSON array.",
  `Items are either {"t":"l","l":int,"c":"string"} or {"t":"b","s":int,"e":int,"c":"string"}.`,
  "Skip imports and trivial declarations.",
  "No prose. No code fences. No placeholders.",
].join("\n");

const schema = {
  name: "DocComments",
  schema: {
    type: "array",
    items: {
      anyOf: [
        {
          type: "object",
          additionalProperties: false,
          properties: {
            t: { const: "l" },
            l: { type: "integer", minimum: 1 },
            c: { type: "string", minLength: 1 },
          },
          required: ["t", "l", "c"],
        },
        {
          type: "object",
          additionalProperties: false,
          properties: {
            t: { const: "b" },
            s: { type: "integer", minimum: 1 },
            e: { type: "integer", minimum: 1 },
            c: { type: "string", minLength: 1 },
          },
          required: ["t", "s", "e", "c"],
        },
      ],
    },
  },
  strict: true,
} as const;

type Req = { code: string };

export async function POST(req: NextRequest) {
  try {
    const { code } = (await req.json()) as Req;
    if (!code)
      return NextResponse.json({ error: "Missing code" }, { status: 400 });

    const resp = await oai.responses.create(
      {
        model: "gpt-5-nano",
        input: [
          { role: "developer", content: DEV },
          { role: "user", content: code },
        ],
        response_format: { type: "json_schema", json_schema: schema },
        max_output_tokens: 1200,
        temperature: 0,
      },
      { signal: req.signal }
    );

    const data = JSON.parse(resp.output_text ?? "[]") as Array<
      | { t: "l"; l: number; c: string }
      | { t: "b"; s: number; e: number; c: string }
    >;

    return NextResponse.json(
      { response: data, tokens: resp.usage?.total_tokens },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
