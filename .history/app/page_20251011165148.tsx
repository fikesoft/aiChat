import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";

export default function Home() {
  return (
    <div>
      "use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Example playground layout:
 * - left: code editor (textarea for demo)
 * - center-bottom of left: generated buttons (map over `actions`)
 * - right: output code block
 *
 * Swap the textarea for CodeMirror or Monaco if you prefer.
 */

export default function CodePlayground() {
  const [code, setCode] = useState<string>("// write code here\n");
  const [output, setOutput] = useState<string>("// output will appear here");

  const actions = [
    { id: "run", label: "Run", handler: () => setOutput(`// Run result\n${code}`) },
    {
      id: "format",
      label: "Format",
      handler: () =>
        setOutput((prev) => `// Formatted result\n${code.trim().replace(/\s+$/g, "")}`),
    },
    { id: "clear", label: "Clear", handler: () => { setCode(""); setOutput("// cleared"); } },
    // add more generated actions here
  ];

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left aside (your existing Aside/nav) would sit here */}
      <aside className="hidden md:block w-64 border-r bg-white">
        {/* put your Aside component instead */}
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* INPUT column */}
            <div className="flex flex-col items-center">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Input code</CardTitle>
                </CardHeader>
                <CardContent>
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="// enter code"
                    className="w-full min-h-[520px] resize-none p-4 bg-slate-50 border rounded font-mono text-sm text-slate-800 focus:outline-none"
                  />
                </CardContent>
              </Card>

              {/* buttons centered under the INPUT card */}
              <div className="mt-4 w-full flex justify-center">
                <div className="flex gap-3">
                  {actions.map((a) => (
                    <Button key={a.id} onClick={a.handler}>
                      {a.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* OUTPUT column */}
            <div>
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Output</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="w-full min-h-[584px] p-4 bg-black/80 text-white rounded overflow-auto text-sm font-mono">
                    <code>{output}</code>
                  </pre>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

    </div>
  );
}
