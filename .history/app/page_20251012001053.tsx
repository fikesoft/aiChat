"use client ";
import TokenCounter from "@/components/ui/TokenCounter/TokenCounter";
import { countTokensAction } from "@/actions/countTokenAction";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="grid grid-cols-2 gap-3.5 items-center  h-full bg-primary-foreground">
      {/**Input */}
      <Card className="items-end shadow-lg max-w-6/12 border-none bg-primary text-primary-foreground">
        {/**?????????????? */}
        <CardContent className="w-full">
          <TokenCounter
            countTokensAction={countTokensAction}
            model="gpt-3.5-turbo"
          />
        </CardContent>
        <CardFooter>
          <Button className="bg-primary-foreground">Generate</Button>
        </CardFooter>
      </Card>
      {/**Output */}
      <div>
        <div>
          <h1>fasfjbasfmklas</h1>
        </div>
      </div>
    </div>
  );
}
