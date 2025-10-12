import { useState, useTransition } from "react";

export const useFetchData = ({}) => {
  const [response, setResponse] = useState([]);
  const [isLoading, startTransition] = useTransition();
  const [error, setError] = useState("");
  const fetchData = async () => {
    try {
    } catch (error) {}
  };
  return { response, isLoading, error };
};
