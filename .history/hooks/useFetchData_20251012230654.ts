import { useRef, useState, useCallback } from "react";

type HTTPMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";

type FetchArgs = {
  url: string;
  method?: HTTPMethod;
  headers?: Record<string, string>;
  body?: BodyInit | null;
};

export function useFetchData<T = unknown>() {
  const [response, setResponse] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const controllerRef = useRef<AbortController | null>(null);
  const run = async ({ url, method = "GET", headers, body }: FetchArgs) => {
    const ac = new AbortController();
    controllerRef.current = ac;

    console.log("[run] start"); // vezi tranzitia
    setIsLoading(true);
    setError("");

    try {
      console.log("[run] fetch...");
      const res = await fetch(url, {
        method,
        headers,
        body,
        signal: ac.signal,
      });
      console.log("[run] status", res.status);
      const ct = res.headers.get("content-type") ?? "";

      // NU citi JSON înainte de validări
      const raw = ct.includes("application/json")
        ? await res.text()
        : await res.text();
      const payload = ct.includes("application/json") ? JSON.parse(raw) : raw;

      if (!res.ok)
        throw new Error(
          typeof payload === "string"
            ? raw
            : JSON.stringify(payload).slice(0, 300)
        );

      setResponse(payload as T);
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") {
        console.log("[run] aborted");
      } else {
        console.error("[run] error", e);
        setError(e instanceof Error ? e.message : String(e));
      }
    } finally {
      if (controllerRef.current === ac) controllerRef.current = null;
      setIsLoading(false);
      console.log("[run] end");
    }
  };

  const cancel = useCallback(() => controllerRef.current?.abort(), []);

  return { response, isLoading, error, run, cancel };
}
