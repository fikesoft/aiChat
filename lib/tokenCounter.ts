import "server-only";

const modelModule: Record<string, string> = {
  "gpt-3.5-turbo": "gpt-tokenizer/model/gpt-3.5-turbo",
};

export async function countTokens(text: string, model: string) {
  const path = modelModule[model] ?? "gpt-tokenizer";
  const { countTokens } = await import(path);
  return countTokens(text);
}
