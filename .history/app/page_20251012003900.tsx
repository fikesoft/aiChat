"use client";
import TokenCounter from "@/components/ui/TokenCounter/TokenCounter";
import { countTokensAction } from "@/actions/countTokenAction";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {}
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">Token Tool</h1>
          <p className="text-sm text-muted-foreground">
            Numără rapid tokenii și pregătește promptul.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
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
                className="resize-y leading-relaxed"
              />
              <div className="flex items-center gap-2">
                <Button
                  className="bg-primary text-primary-foreground"
                  onClick={() => {
                    /* plug your generate action here */
                  }}
                >
                  Generate
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCopy}
                  className="border-border"
                >
                  Copy
                </Button>
                <span className="ml-auto text-xs text-muted-foreground">
                  {text.length} caractere
                </span>
              </div>
            </CardContent>

            <CardFooter className="pt-0">
              <div className="text-xs text-muted-foreground">
                Sfaturi: folosește propoziții scurte, evită redundanța,
                definește clar outputul dorit.
              </div>
            </CardFooter>
          </Card>

          {/* Output */}
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Output</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-border bg-card/40 p-4">
                <pre className="whitespace-pre-wrap break-words font-mono text-sm leading-6 text-card-foreground/90">
                  {`// Afișează aici răspunsul generat
// Poți înlocui <pre> cu <Textarea readOnly> dacă vrei editare ulterioară.`}
                </pre>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <div className="text-xs text-muted-foreground">
                Păstrează contextul, dar limitează zgomotul.
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}
