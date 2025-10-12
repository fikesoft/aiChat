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

  const run = useCallback(
    async ({ url, method = "GET", headers, body }: FetchArgs) => {
      controllerRef.current?.abort();
      const ac = new AbortController();
      controllerRef.current = ac;

      setIsLoading(true);
      setError("");
      try {
        const res = await fetch(url, {
          method,
          headers,
          body,
          signal: ac.signal,
        });
        const ct = res.headers.get("content-type") ?? "";
        const payload = ct.includes("application/json")
          ? await res.json()
          : await res.text();
        if (!res.ok)
          throw new Error(
            `HTTP ${res.status} — ${
              typeof payload === "string"
                ? payload
                : JSON.stringify(payload).slice(0, 200)
            }`
          );
        setResponse(payload as T);
      } catch (e) {
        if (e?.name !== "AbortError")
          setError(e instanceof Error ? e.message : String(e));
      } finally {
        if (controllerRef.current === ac) controllerRef.current = null;
        setIsLoading(false);
      }
    },
    []
  );

  const cancel = useCallback(() => controllerRef.current?.abort(), []);

  return { response, isLoading, error, run, cancel };
}
