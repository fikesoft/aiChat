"use server";
import "server-only";

export const runtime = "nodejs";
import { encoding_for_model, get_encoding } from "@dqbd/tiktoken";
import type { TiktokenModel } from "@dqbd/tiktoken";

export function countTokens(text: string, model?: TiktokenModel): number {
  const enc = (() => {
    try {
      return model ? encoding_for_model(model) : get_encoding("cl100k_base");
    } catch {
      return get_encoding("cl100k_base");
    }
  })();

  const len = enc.encode(text).length;
  enc.free();
  return len;
}
