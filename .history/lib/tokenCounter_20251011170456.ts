import { encoding_for_model, get_encoding } from "@dqbd/tiktoken";

export function countTokens(text: string, model = "gpt-4o-mini"): number {
  const enc = (() => {
    try {
      return encoding_for_model(model);
    } catch {
      return get_encoding("cl100k_base");
    }
  })();

  const length = enc.encode(text).length;
  enc.free();
  return length;
}
