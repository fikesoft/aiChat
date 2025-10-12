import { useState, useTransition } from "react";

export const useFetchData = ({ url }: { url: string }) => {
  const [response, setResponse] = useState([]);
  const [isLoading, startTransition] = useTransition();
  const [error, setError] = useState("");
  const fetchData = async () => {
    startTransition;
    try {
      const data = await fetch(url);
      const json = await data.json();
      setResponse(json);
    } catch (error) {
      setError(error);
    }
  };
  return { response, isLoading, error };
};
