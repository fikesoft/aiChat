export type TokensConsumptionType = "low" | "medium" | "high";
export interface IRequestDocCode {
  code: string;
}
export interface IResponseDocCode {
  response: string;
  tokens: number | undefined;
}
