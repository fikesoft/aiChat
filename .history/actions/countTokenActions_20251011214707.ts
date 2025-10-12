"use server";

import type { TiktokenModel } from "@dqbd/tiktoken";
import { countTokens } from "@/lib/tokenCounter";
export async function countTokensAction(text: string, model: TiktokenModel) {
  return countTokens(text, model);
}
