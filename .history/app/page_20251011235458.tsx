import TokenCounter from "@/components/ui/TokenCounter/TokenCounter";
import { countTokensAction } from "@/actions/countTokenAction";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div>
      {/**Input */}
      <div>
        <Card>
          {/**?????????????? */}

          <CardContent>
            <TokenCounter
              countTokensAction={countTokensAction}
              model="gpt-3.5-turbo"
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
