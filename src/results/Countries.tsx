import React, { useMemo } from "react";
import { useResults } from "../useResults";
import { Bar } from "react-chartjs-2";
import { chartColors } from "./Lined";

export const Countries = () => {
  const results = useResults();
  const resultCount = results.length;

  const countryBuckets = useMemo(
    () =>
      results.reduce((carry, { countryCode }) => {
        const newCarry = { ...carry };

        if (newCarry.hasOwnProperty(countryCode)) {
          newCarry[countryCode]++;
        } else {
          newCarry[countryCode] = 0;
        }

        return newCarry;
      }, {} as { [countryCode: string]: number }),
    [results]
  );

  return (
    <Bar
      data={{
        labels: Object.keys(countryBuckets),
        datasets: [
          {
            label: "All",
            data: Object.values(countryBuckets).map(
              (value) => value / resultCount
            ),
            backgroundColor: chartColors[2],
          },
        ],
      }}
    />
  );
};
