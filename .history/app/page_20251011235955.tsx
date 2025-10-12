"use client ";
import TokenCounter from "@/components/ui/TokenCounter/TokenCounter";
import { countTokensAction } from "@/actions/countTokenAction";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
          <CardFooter>
            <Button>Generate</Button>
          </CardFooter>
        </Card>
      </div>
      {/**Output */}
      <div></div>
    </div>
  );
}
