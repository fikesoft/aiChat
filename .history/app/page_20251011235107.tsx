import TokenCounter from "@/components/ui/TokenCounter/TokenCounter";
import { countTokensAction } from "@/actions/countTokenAction";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
export const runtime = "nodejs";

export default function Home() {
  return (
    <div>
      {/**Input */}
      <div>
        <Card>
          <CardHeader>
            <TokenCounter
              countTokensAction={countTokensAction}
              model="gpt-3.5-turbo"
            />
          </CardHeader>
          <CardContent>
            <Textarea
              value={text}
              onChange={(e) => handleChange(e.target.value)}
              placeholder="Enter your code"
              rows={10}
            />
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </div>
      {/**Output */}
      <div></div>
    </div>
  );
}
