import React from "react";
import { useResults } from "../useResults";

export const JSONed = () => {
  const results = useResults();

  const jsonedResults = JSON.stringify(results);

  return <div>{jsonedResults}</div>;
};
