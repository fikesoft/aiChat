import { encoding_for_model, get_encoding } from "@dqbd/tiktoken";
import type { TiktokenModel } from "@dqbd/tiktoken";
export function countTokens(
  text,
  model = "gpt-3.5-turbo"
): { string; TiktokenModel } {
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
