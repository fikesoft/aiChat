"use client";
import TokenCounter from "@/components/ui/TokenCounter/TokenCounter";
import { countTokensAction } from "@/actions/countTokenAction";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const handleOnClickGenerate = () => {
    try {
      const response = fetch("/api/doc-code", { method: "POST" });
    } catch (error) {}
  };
  return (
    <div className=" max-w-8/12 mx-auto pt-20">
      <div className="mb-6 col-span-2 justify-items-center">
        <h1 className="text-2xl font-semibold text-center">
          Document your code
        </h1>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-10">
        {/* Input */}
        <Card className="border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">Input</CardTitle>
            <TokenCounter
              countTokensAction={countTokensAction}
              model="gpt-3.5-turbo"
              text={text}
            />
          </CardHeader>

          <CardContent className="space-y-3">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Scrie sau lipește textul aici…"
              rows={14}
              className="md:min-h-[600px] md:max-h-[600px] min-h-[300px] max-h-[300px] "
            />
            <div className="flex items-center gap-2">
              <Button variant={"default"} onClick={() => {}}>
                Generate
              </Button>
              <span className="ml-auto text-xs text-muted-foreground">
                {text.length} characters
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Output */}
        <Card className="border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Output</CardTitle>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </div>
    </div>
  );
}
