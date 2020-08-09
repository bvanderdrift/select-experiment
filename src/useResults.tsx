import { useEffect, useState } from "react";
import { firestoreDatabase } from "./firebase";
import { ExperimentDataPoint } from "./analysis";

export const useResults = () => {
  const [results, setResults] = useState<ExperimentDataPoint[]>([]);

  useEffect(() => {
    const fetchAndPrint = async () => {
      const snapshot = await firestoreDatabase.collection("entry").get();
      const data = snapshot.docs.map(
        (doc) => doc.data() as ExperimentDataPoint
      );

      setResults(data);
    };

    fetchAndPrint();
  }, []);

  return results;
};
