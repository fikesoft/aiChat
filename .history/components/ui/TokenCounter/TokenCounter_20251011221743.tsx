import { useCallback, useRef, useState, useTransition } from "react";
import { Textarea } from "../textarea";
import { TiktokenModel } from "@dqbd/tiktoken";

interface ITokenCounter {
  countTokensAction: (text: string, model?: TiktokenModel) => Promise<number>;
  model?: string;
}
function TokenCounter({ countTokensAction, model }: ITokenCounter) {
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
  return (
    <div className="space-y-2">
      <div className="text-sm">
        Tokens: <span className="font-medium">{tokens}</span>
        {isPending ? "…" : ""}
      </div>
      <Textarea
        value={text}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Enter text"
        rows={10}
      />
    </div>
  );
}

export default TokenCounter;
