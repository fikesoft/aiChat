import { useState, useTransition } from "react";

export const useFetchData = ({}) => {
  const [response, setResponse] = useState([]);
  const [isLoading, startTransition] = useTransition();
  const [error, setError] = useState("");
  return { response, isLoading, error };
};
