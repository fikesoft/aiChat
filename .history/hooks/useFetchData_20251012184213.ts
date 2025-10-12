import { useEffect, useState, useTransition } from "react";

export const useFetchData = ({ url }: { url: string }) => {
  const [response, setResponse] = useState([]);
  const [isLoading, startTransition] = useTransition();
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchData = startTransition(async () => {
      try {
        const data = await fetch(url);
        const json = await data.json();
        setResponse(json);
      } catch (error) {
        setError(error);
      }
    });
    fetchData();
  }, [url]);

  return { response, isLoading, error };
};
