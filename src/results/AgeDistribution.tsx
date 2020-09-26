import React, { useMemo } from "react";
import { useResults } from "../useResults";
import { ExperimentDataPoint } from "../analysis";
// Source: https://www.census.gov/data/datasets/time-series/demo/popest/2010s-national-detail.html
import usAgeBuckets from "./us-age-distribution.json";
import { Bar } from "react-chartjs-2";
import Color from "color";
import { chartColors } from "./Lined";

const AGE_BUCKET_SIZE = 5;

const normalizeBuckets = (bucketData: number[]) => {
  const sum = bucketData.reduce(
    (carry, currentBucketValue) => carry + currentBucketValue,
    0
  );
  return bucketData.map((bucketValue) => bucketValue / sum);
};

const createAgeBuckets = (data: ExperimentDataPoint[]): number[] => {
  const maxAge = Math.max(
    ...(data.length === 0 ? [{ age: 1 } as ExperimentDataPoint] : data).map(
      (d) => d.age
    )
  );
  const bucketCount = Math.ceil(maxAge / AGE_BUCKET_SIZE) + 1;

  return data.reduce((carry, dataPoint) => {
    const newCarry = [...carry];
    const bucket = Math.floor(dataPoint.age / AGE_BUCKET_SIZE);
    newCarry[bucket]++;
    return newCarry;
  }, new Array(bucketCount).fill(0));
};

export const AgeDistribution = () => {
  const results = useResults();

  const filledBuckets = useMemo(() => createAgeBuckets(results), [results]);
  const bucketCount = filledBuckets.length;
  const responseData = {
    label: "Responses",
    data: normalizeBuckets(filledBuckets),
    backgroundColor: Color(chartColors[0]).alpha(0.2).string(),
  };
  const usAgeData = {
    label: "US Age Distribution 2019",
    data: normalizeBuckets(usAgeBuckets).slice(0, bucketCount),
    backgroundColor: Color(chartColors[2]).alpha(0.2).string(),
  };

  const bucketLabels = new Array(bucketCount)
    .fill(0)
    .map(
      (_, index) =>
        `${index * AGE_BUCKET_SIZE} - ${(index + 1) * AGE_BUCKET_SIZE - 1}`
    );

  return (
    <Bar
      data={{
        labels: bucketLabels,
        datasets: [responseData, usAgeData],
      }}
    />
  );
};
