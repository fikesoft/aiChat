import "server-only";
import init, {
  encoding_for_model,
  get_encoding,
} from "@dqbd/tiktoken/lite/init";
import type { TiktokenModel } from "@dqbd/tiktoken";

// Let Turbopack bundle the WASM
import wasm from "@dqbd/tiktoken/lite/tiktoken_bg.wasm?module";

let ready: Promise<void> | null = null;
function ensureInit() {
  if (!ready) {
    ready = init((imports) => WebAssembly.instantiate(wasm as any, imports));
  }
  return ready;
}

export async function countTokens(
  text: string,
  model: TiktokenModel | string = "gpt-3.5-turbo"
) {
  await ensureInit();
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
