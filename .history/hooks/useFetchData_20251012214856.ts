import { useEffect, useState } from "react";
type HTTPMethods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";

interface IUseFetchDataProps {
  url: string;
  method: HTTPMethods;
  headers: Record<string, string>;
  body: BodyInit | null | undefined;
}

export function useFetchData<T>({
  url,
  method,
  headers,
  body,
}: IUseFetchDataProps) {
  const [response, setResponse] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const currectController: AbortController | null = null;
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetch(url, {
          method: method,
          headers: headers,
          signal: currectController.signal,
          body: body,
        });
        if (!data.ok) throw new Error("HTTP error status " + data.status);
        const json = await data.json();
        setResponse(json);
      } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : String(error);
        setError(msg);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url, method, headers, body]);
  function onCancelFetchData() {}
  return { response, isLoading, error };
}
