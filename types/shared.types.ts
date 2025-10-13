export type TokensConsumptionType = "low" | "medium" | "high";
export interface IRequestDocCode {
  code: string;
  level: TokensConsumptionType;
}
type DocCodeSuccess = {
  ok: true;
  response: string;
  tokens?: number;
};
type DocCodeError = {
  ok: false;
  error: string;
};
export type DocCodeResult = DocCodeSuccess | DocCodeError;
