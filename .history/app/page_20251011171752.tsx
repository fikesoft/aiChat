import { Textarea } from "@/components/ui/textarea";
import { validateHeaderValue } from "http";
import { useEffect, useState } from "react";

export default function Home() {
  const [tokens, setTokens] = useState(0);
  const [text, setText] = useState("");
  const [];
  useEffect(() => {}, [tokens]);
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
