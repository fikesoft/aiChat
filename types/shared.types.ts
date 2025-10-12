export type TokensConsumptionType = "low" | "medium" | "high";
export interface IRequestDocCode {
  code: string;
  level: TokensConsumptionType;
}
export interface IResponseDocCode {
  response: string;
  tokens: number | undefined;
}
