"use client";
import TokenCounter from "@/components/ui/TokenCounter/TokenCounter";
import { countTokensAction } from "@/actions/countTokenAction";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");

  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-6 pt-10 md:pt-20">
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-semibold text-center">
          Document your code
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-10">
        {/* Input */}
        <Card className="border-border shadow-sm">
          <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between pb-2">
            <CardTitle className="text-base md:text-lg font-medium">
              Input
            </CardTitle>
            <div className="md:ml-auto">
              <TokenCounter
                countTokensAction={countTokensAction}
                model="gpt-3.5-turbo"
                text={text}
              />
            </div>
          </CardHeader>

          <CardContent className="space-y-3">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Scrie sau lipește textul aici…"
              rows={12}
              className="min-h-[40vh] md:min-h-[60vh]"
            />
            <div className="flex flex-wrap items-center gap-2">
              <Button type="button" onClick={() => {}}>
                Generate
              </Button>
              <Button type="button" variant="outline">
                Copy
              </Button>
              <span className="ml-auto text-xs text-muted-foreground">
                {text.length} caractere
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Output */}
        <Card className="border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base md:text-lg font-medium">
              Output
            </CardTitle>
          </CardHeader>
          <CardContent className="min-h-[30vh] md:min-h-[60vh]"></CardContent>
        </Card>
      </div>
    </div>
  );
}
