"use client";
import TokenCounter from "@/components/ui/TokenCounter/TokenCounter";
import { countTokensAction } from "@/actions/countTokenAction";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { useFetchData } from "@/hooks/useFetchData";
import type { IResponseDocCode } from "@/types/shared.types";
import { Select } from "@radix-ui/react-select";
export default function Home() {
  const [text, setText] = useState("");
  const { response, isLoading, error, run, cancel } =
    useFetchData<IResponseDocCode>();

  const handleOnClickGenerate = () => {
    run({
      url: "/api/doc-code",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: text }),
    });
    console.log(response);
  };
  useEffect(() => {
    console.log(isLoading + "state");
  }, [isLoading]);
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
            {error ?? <p className="text-red-400">{error}</p>}
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Scrie sau lipește textul aici…"
              rows={14}
              className="md:min-h-[600px] md:max-h-[600px] min-h-[300px] max-h-[300px] "
            />
            <div className="flex items-center gap-2">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant={"default"}
                onClick={isLoading ? cancel : handleOnClickGenerate}
              >
                {isLoading ? "Stop generating" : "Generate"}
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
