import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { countTokens } from "@/lib/tokenCounter";
import TokenCounter from "@/components/ui/TokenCounter/TokenCounter";
import { countTokensAction } from "@/actions/countTokenAction";
export default function Home() {
  const [tokens, setTokens] = useState(0);
  const [text, setText] = useState("");

  useEffect(() => {
    setTokens(countTokens(text, "gpt-3.5-turbo"));
  }, [text]);
  return (
    <div>
      {/**Input */}
      <div>
        <TokenCounter
          countTokensAction={countTokensAction}
          model="gpt-3.5-turbo"
        />
      </div>
      {/**Output */}
      <div></div>
    </div>
  );
}
