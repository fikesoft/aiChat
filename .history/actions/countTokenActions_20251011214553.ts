"use server";

import type { TiktokenModel } from "@dqbd/tiktoken";
import { countTokens } from "@/lib/tokenCounter";
export async function countTokensAction(text: string, model: "gpt-3.5-turbo") {
  return countTokens(text, model);
}
