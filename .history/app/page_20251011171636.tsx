import { Textarea } from "@/components/ui/textarea";
import { validateHeaderValue } from "http";
import { useEffect, useState } from "react";

export default function Home() {
  const [tokens, setTokens] = useState();
  useEffect(() => {}, []);
  return (
    <div>
      {/**Input */}
      <div>
        <Textarea
          value={tokens}
          onChange={(e) => {
            setTokens(e.target.value);
          }}
        />
      </div>
      {/**Output */}
      <div></div>
    </div>
  );
}
