import { useRef, useState, useTransition } from "react";

export const useFetchData = ({}) => {
  const [response, setResponse] = useState([]);
  const [isLoading] = useTransition();
  return;
};
