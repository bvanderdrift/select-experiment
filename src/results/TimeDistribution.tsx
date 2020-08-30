import React, { useMemo } from "react";
import { useResults } from "../useResults";
import { ExperimentDataPoint, filterByType } from "../analysis";
import { SelectionType } from "../CountryPicker";
import { ChartDataSets } from "chart.js";
import { chartColors } from "./TimeOptionsPlot";
import Color from "color";
import { Bar } from "react-chartjs-2";

const createSelectionTypeDataSet = (
  data: ExperimentDataPoint[],
  bucketRange: number,
  selectionType: SelectionType,
  selectionTypeIndex: number
): ChartDataSets => ({
  label: selectionType,
  data: filterByType(data, selectionType).reduce((carry, dataPoint) => {
    const updatedCarry = [...carry];
    const bucketIndex = Math.floor(dataPoint.selectionTime / bucketRange);
    updatedCarry[bucketIndex] = updatedCarry[bucketIndex] + 1;

    return updatedCarry;
  }, Array(BUCKET_COUNT).fill(0)),
  borderColor: chartColors[selectionTypeIndex],
  backgroundColor: Color(chartColors[selectionTypeIndex]).alpha(0.2).string(),
});

const BUCKET_COUNT = 20;

export const TimeDistribution = () => {
  const results = useResults();
  const maximumTime = useMemo(() => {
    if (results.length === 0) {
      return BUCKET_COUNT;
    }

    const sortedResults = [...results].sort(
      (a, b) => b.selectionTime - a.selectionTime
    );

    return sortedResults[0].selectionTime + 1;
  }, [results]);

  const buckets = useMemo(
    () =>
      Array(BUCKET_COUNT)
        .fill(null)
        .map((_, index) => {
          const lowerPercentage = index / BUCKET_COUNT;
          const upperPercentage = (index + 1) / BUCKET_COUNT;

          const lowerLimit = Math.floor(lowerPercentage * maximumTime);
          const upperLimit = Math.floor(upperPercentage * maximumTime);

          return [lowerLimit, upperLimit];
        }),
    [maximumTime]
  );

  const bucketSize = useMemo(() => buckets[0][1] - buckets[0][0], [buckets]);

  const chartData = useMemo(
    () =>
      Object.values(SelectionType).map((selectionType, index) =>
        createSelectionTypeDataSet(results, bucketSize, selectionType, index)
      ),
    [bucketSize, results]
  );

  return (
    <Bar
      data={{
        labels: buckets.map((bucket) => `${bucket[0]} - ${bucket[1]}`),
        datasets: chartData,
      }}
    />
  );
};
