import React, { useMemo } from "react";
import { useResults } from "../useResults";
import { ExperimentDataPoint } from "../analysis";
import { ChartDataSets } from "chart.js";
import { Scatter } from "react-chartjs-2";

const createSelectionTypeDataSet = (
  data: ExperimentDataPoint[]
): ChartDataSets => ({
  label: "All",
  data: data.map((dataPoint) => ({
    x: dataPoint.age,
    y: dataPoint.selectionTime,
  })),
});

export const AgeScattered = () => {
  const results = useResults();

  const chartData = useMemo(() => [createSelectionTypeDataSet(results)], [
    results,
  ]);

  return (
    <Scatter
      data={{
        datasets: chartData,
      }}
    />
  );
};
