"use client";
import TokenCounter from "@/components/ui/TokenCounter/TokenCounter";
import { countTokensAction } from "@/actions/countTokenAction";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  const [text, setText] = useState("");
  return (
    <div className="grid grid-cols-2 gap-3.5 items-center  h-full bg-primary-foreground">
      {/**Input */}
      <Card className="shadow-lg max-w-6/12 border-none bg-primary text-primary-foreground">
        <CardHeader>
          <TokenCounter
            countTokensAction={countTokensAction}
            model="gpt-3.5-turbo"
            text={text}
          />
        </CardHeader>
        <CardContent className="w-full">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
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
