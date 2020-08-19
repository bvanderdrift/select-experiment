import React from "react";
import { Line } from "react-chartjs-2";
import { countryCountOptions, SelectionType } from "./CountryPicker";
import { filterByTypeCount, getAverage, ExperimentDataPoint } from "./analysis";
import { ChartDataSets } from "chart.js";
import Color from "color";
import { useResults } from "./useResults";

// Consistent due to index-base. If any order of colors or selection type changes color assignments change too.
// Colors sourced from https://coolors.co/264653-2a9d8f-e9c46a-f4a261-e76f51
const chartColors = ["#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"];

const createSelectionTypeDataSet = (
  data: ExperimentDataPoint[],
  selectionType: SelectionType,
  selectionTypeIndex: number
): ChartDataSets => ({
  label: selectionType,
  data: countryCountOptions.map((optionCount) =>
    getAverage(filterByTypeCount(data, selectionType, optionCount))
  ),
  borderColor: chartColors[selectionTypeIndex],
  backgroundColor: Color(chartColors[selectionTypeIndex]).alpha(0.2).string(),
});

export const Results = () => {
  const data = useResults();

  return (
    <Line
      data={{
        labels: countryCountOptions.map((optionCount) =>
          optionCount.toString()
        ),
        datasets: Object.values(SelectionType).map((type, index) =>
          createSelectionTypeDataSet(data, type, index)
        ),
      }}
      options={{
        tooltips: {
          callbacks: {
            title: (a) => `# of options: ${a[0].label}`,
            afterTitle: (a, b) => {
              const selectionType = (b.datasets || [])[a[0].datasetIndex || 0]
                .label as SelectionType;
              const datapointCount = filterByTypeCount(
                data,
                selectionType,
                parseInt(a[0].label || "3")
              ).length;
              return `# of datapoints: ${datapointCount}`;
            },
          },
        },
      }}
    />
  );
};
