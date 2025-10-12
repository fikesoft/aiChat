import { useEffect, useState, useTransition } from "react";
type HTTPMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
export const useFetchData = ({ url,method}: { url: string ,method:HTTPMethod }) => {
  const [response, setResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetch(url,{
          method:
        });
        const json = await data.json();
        setResponse(json);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { response, isLoading, error };
};
