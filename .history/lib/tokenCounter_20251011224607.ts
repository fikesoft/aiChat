import "server-only";

const modelModule: Record<string, string> = {
  "gpt-3.5-turbo": "gpt-tokenizer/model/gpt-3.5-turbo", // cl100k_base
  "gpt-4": "gpt-tokenizer/model/gpt-4", // cl100k_base
  "gpt-4o": "gpt-tokenizer/model/gpt-4o", // o200k_base
  "gpt-4o-mini": "gpt-tokenizer/model/gpt-4o-mini", // o200k_base
  "gpt-4.1": "gpt-tokenizer/model/gpt-4.1", // o200k_base
  // add as needed
};

export async function countTokens(text: string, model: string = "gpt-4o") {
  const path = modelModule[model] ?? "gpt-tokenizer"; // defaults to o200k_base
  const { countTokens } = await import(path);
  return countTokens(text);
}
