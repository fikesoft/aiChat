import OpenAI from "openai";
//Signle ton
export const oai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
