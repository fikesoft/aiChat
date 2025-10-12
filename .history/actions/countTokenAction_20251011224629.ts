"use server";
import { countTokens } from "@/lib/tokenCounter";

export async function countTokensAction(text: string, model = "gpt-4o") {
  return countTokens(text, model);
}
