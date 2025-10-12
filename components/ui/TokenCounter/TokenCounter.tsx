"use client";
import { useEffect, useRef, useState, useTransition } from "react";

type Props = {
  text: string;
  model?: string;
  countTokensAction: (text: string, model?: string) => Promise<number>;
  debounce?: number;
};

export default function TokenCounter({
  text,
  model,
  countTokensAction,
  debounce = 200,
}: Props) {
  const [tokens, setTokens] = useState(0);
  const [isPending, startTransition] = useTransition();
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      startTransition(async () => {
        setTokens(await countTokensAction(text, model));
      });
    }, debounce);

    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [text, model, countTokensAction, debounce]);

  return (
    <div className="text-sm">
      Tokens: <span className="font-medium">{tokens}</span>
      {isPending ? "…" : ""}
    </div>
  );
}
