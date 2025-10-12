import { useEffect, useState } from "react";
type HTTPMethods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
export const useFetchData = ({
  url,
  method,
  headers,
  body,
}: {
  url: string;
  method: HTTPMethods;
  headers: Record<string, string>;
  body: Record<string, unknown> | BodyInit | null;
}) => {
  const [response, setResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetch(url, {
          method: method,
          headers: headers,
          body: body,
        });
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
  }, [url, method, headers]);

  return { response, isLoading, error };
};
