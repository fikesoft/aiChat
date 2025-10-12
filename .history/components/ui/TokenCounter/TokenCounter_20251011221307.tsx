import React, { useCallback, useRef, useState, useTransition } from "react";

interface ITokenCounter {
  countTokensAction: (text: string, model?: string) => Promise<number>;
  model?: string;
}
function TokenCounter({
  countTokensAction,
  model = "gpt-3.5-turbo",
}: ITokenCounter) {
  const [text, setText] = useState("");
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
      }, 200); // debounce
    },
    [countTokensAction, model]
  );
  return <div>TokenCounter</div>;
}

export default TokenCounter;
