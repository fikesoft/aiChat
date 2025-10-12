import { useState, useTransition } from "react";

export const useFetchData = ({ url }: { url: string }) => {
  const [response, setResponse] = useState([]);
  const [isLoading, startTransition] = useTransition();
  const [error, setError] = useState("");
  const fetchData = async () => {
    try {
      const response = await fetch(url);
    } catch (error) {}
  };
  return { response, isLoading, error };
};
