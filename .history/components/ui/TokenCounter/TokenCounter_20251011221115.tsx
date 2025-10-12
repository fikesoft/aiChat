import React from "react";

interface ITokenCounter {
  countTokensAction: (text: string, model?: string) => Promise<number>;
  model?: string;
}
const TokenCounter = ({ countTokensAction, model = "gpt-3.5-turbo" }) => {
  return <div>TokenCounter</div>;
};

export default TokenCounter;
