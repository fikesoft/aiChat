import { useEffect, useState } from "react";
type HTTPMethods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
export const useFetchData = ({
  url,
  method,
  headers,
}: {
  url: string;
  method: HTTPMethods;
  headers: string;
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
          headers: { headers },
        });
        const json = await data.json();
        setResponse(json);
      } catch (error: unknown) {
        const msg = err instanceof Error ? err.message : String(err);

        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url, method, headers]);

  return { response, isLoading, error };
};
