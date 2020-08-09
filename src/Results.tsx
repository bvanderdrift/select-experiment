import React from "react";
import { Line } from "react-chartjs-2";
import broadlyTypeData from "./data.json";
import { countryCountOptions, SelectionType } from "./CountryPicker";
import { filterByTypeCount, ExperimentDataPoint, getAverage } from "./analysis";
import { ChartDataSets } from "chart.js";
import Color from "color";

const data = (broadlyTypeData as any) as ExperimentDataPoint[];

// Consistent due to index-base. If any order of colors or selection type changes color assignments change too.
// Colors sourced from https://coolors.co/264653-2a9d8f-e9c46a-f4a261-e76f51
const chartColors = ["#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"];

const createSelectionTypeDataSet = (
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
  return (
    <Line
      data={{
        labels: countryCountOptions.map((optionCount) =>
          optionCount.toString()
        ),
        datasets: Object.values(SelectionType).map(createSelectionTypeDataSet),
      }}
    />
  );
};
