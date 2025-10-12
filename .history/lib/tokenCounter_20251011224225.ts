import { encoding_for_model, get_encoding } from "@dqbd/tiktoken";
import { type TiktokenModel } from "@dqbd/tiktoken";

export function countTokens(
  text: string,
  model: TiktokenModel | string = "gpt-3.5-turbo"
) {
  const enc = (() => {
    try {
      return encoding_for_model(model as TiktokenModel);
    } catch {
      return get_encoding("cl100k_base");
    }
  })();
  const len = enc.encode(text).length;
  enc.free();
  return len;
}
