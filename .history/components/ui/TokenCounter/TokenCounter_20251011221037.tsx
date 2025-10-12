import React from "react";

interface ITokenCounter {
  countTokensAction: (text: string, model?: string) => Promise<number>;
  model?: string;
}
const TokenCounter = ({ countTokensAction, model }) => {
  return <div>TokenCounter</div>;
};

export default TokenCounter;
