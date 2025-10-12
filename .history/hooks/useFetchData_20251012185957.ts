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
        const msg = error instanceof Error ? error.message : String(error);

        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url, method, headers]);

  return { response, isLoading, error };
};
