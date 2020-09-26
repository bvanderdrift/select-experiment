import { useEffect, useState } from "react";
import { firestoreDatabase } from "./firebase";
import { ExperimentDataPoint } from "./analysis";
import cachedResults from "./results/cleaned-cached-json.json";

export const useResults = (useCache: boolean = true) => {
  const [results, setResults] = useState<ExperimentDataPoint[]>([]);

  useEffect(() => {
    const fetchAndPrint = async () => {
      const snapshot = await firestoreDatabase.collection("entry").get();
      const data = snapshot.docs.map(
        (doc) => doc.data() as ExperimentDataPoint
      );

      setResults(data);
    };

    if (useCache) {
      setResults(cachedResults as ExperimentDataPoint[]);
    } else {
      fetchAndPrint();
    }
  }, [useCache]);

  return results;
};
