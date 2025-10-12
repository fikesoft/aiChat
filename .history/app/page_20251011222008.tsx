import TokenCounter from "@/components/ui/TokenCounter/TokenCounter";
import { countTokensAction } from "@/actions/countTokenAction";
export default function Home() {
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
