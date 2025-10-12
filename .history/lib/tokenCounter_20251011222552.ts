"use server";
import "server-only";

import { encoding_for_model, get_encoding } from "@dqbd/tiktoken";
import type { TiktokenModel } from "@dqbd/tiktoken";

export async function countTokens(text: string, model?: TiktokenModel) {
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
