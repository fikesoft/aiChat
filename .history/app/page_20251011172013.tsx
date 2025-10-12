import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { countTokens } from "@/lib/tokenCounter";
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
        <Textarea
          value={tokens}
          onChange={(e) => {
            setText(e.target.value);
          }}
          placeholder="Enter code"
        />
      </div>
      {/**Output */}
      <div></div>
    </div>
  );
}
