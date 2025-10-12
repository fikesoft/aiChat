"use client ";
import TokenCounter from "@/components/ui/TokenCounter/TokenCounter";
import { countTokensAction } from "@/actions/countTokenAction";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  const;
  return (
    <div className="grid grid-cols-2 gap-3.5 items-center  h-full bg-primary-foreground">
      {/**Input */}
      <Card className="items-end shadow-lg max-w-6/12 border-none bg-primary text-primary-foreground">
        <CardHeader>
          <TokenCounter
            countTokensAction={countTokensAction}
            model="gpt-3.5-turbo"
          />
        </CardHeader>
        <CardContent className="w-full">
          <Textarea
            value={text}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Enter your code"
            rows={10}
          />
        </CardContent>
        <CardFooter>
          <Button className="bg-primary-foreground text-primary">
            Generate
          </Button>
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
