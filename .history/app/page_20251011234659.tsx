import TokenCounter from "@/components/ui/TokenCounter/TokenCounter";
import { countTokensAction } from "@/actions/countTokenAction";
import { Card } from "@/components/ui/card";
export const runtime = "nodejs";

export default function Home() {
  return (
    <div>
      {/**Input */}
      <div>
        <Card>
          <TokenCounter
            countTokensAction={countTokensAction}
            model="gpt-3.5-turbo"
          />
        </Card>
      </div>
      {/**Output */}
      <div></div>
    </div>
  );
}
