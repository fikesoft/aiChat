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
  const run = async () => {
  setIsLoading(true);
  await new Promise(r => setTimeout(r, 3000)); // simulare 3s
  setIsLoading(false);
};

/** 
  const run = useCallback(


    async ({ url, method = "GET", headers, body }: FetchArgs) => {
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
        const payload = await res.json();
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        setResponse(payload as T);
      } catch (e: unknown) {
        setError(
          e instanceof Error
            ? e.name !== "AbortError"
              ? e.message
              : ""
            : String(e)
        );
      } finally {
        if (controllerRef.current === ac) controllerRef.current = null;
        setIsLoading(false);
      }
    },
    []
    */
  );

  const cancel = useCallback(() => controllerRef.current?.abort(), []);

  return { response, isLoading, error, run, cancel };
}
