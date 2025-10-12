"use client";
import { useCallback, useRef, useState, useTransition } from "react";
import { Textarea } from "../textarea";

interface ITokenCounter {
  countTokensAction: (text: string, model: string) => Promise<number>;
  model: string;
  text: string;
}
function TokenCounter({ countTokensAction, model, text }: ITokenCounter) {
  const [tokens, setTokens] = useState(0);
  const [isPending, startTransition] = useTransition();
  const timer = useRef<NodeJS.Timeout | null>(null);

  const handleChange = useCallback(
    (v: string) => {
      setText(v);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        startTransition(async () => {
          const n = await countTokensAction(v, model);
          setTokens(n);
        });
      }, 200);
    },
    [countTokensAction, model]
  );
  return (
    <div className="text-sm">
      Tokens: <span className="font-medium">{tokens}</span>
      {isPending ? "…" : ""}
    </div>
  );
}

export default TokenCounter;
