import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";

export default function Home() {
  const [tokens, setTokens] = useState();
  useEffect(() => {}, []);
  return (
    <div>
      {/**Input */}
      <div>
        <Textarea></Textarea>
      </div>
      {/**Output */}
      <div></div>
    </div>
  );
}
