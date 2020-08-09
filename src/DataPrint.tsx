import React, { useEffect, useState } from "react";
import { firestoreDatabase } from "./firebase";
import { Spinner } from "react-bootstrap";

export const DataPrint = () => {
  const [json, setJson] = useState<string>();

  useEffect(() => {
    const fetchAndPrint = async () => {
      const snapshot = await firestoreDatabase.collection("entry").get();
      const data = snapshot.docs.map((doc) => doc.data());

      setJson(JSON.stringify(data));
    };

    fetchAndPrint();
  }, []);
  return <div>{json || <Spinner animation="grow" />}</div>;
};
