import React, { useMemo } from "react";
import { useResults } from "../useResults";
import { ExperimentDataPoint, filterByType } from "../analysis";
import { SelectionType } from "../CountryPicker";
import { ChartDataSets } from "chart.js";
import { chartColors } from "./Lined";
import Color from "color";
import { Scatter } from "react-chartjs-2";

const createSelectionTypeDataSet = (
  data: ExperimentDataPoint[],
  selectionType: SelectionType,
  selectionTypeIndex: number
): ChartDataSets => ({
  label: selectionType,
  data: filterByType(data, selectionType).map((dataPoint) => ({
    x: dataPoint.optionCount,
    y: dataPoint.selectionTime,
  })),
  borderColor: chartColors[selectionTypeIndex],
  backgroundColor: Color(chartColors[selectionTypeIndex]).alpha(0.2).string(),
});

export const Scattered = () => {
  const results = useResults();

  const chartData = useMemo(
    () =>
      Object.values(SelectionType).map((selectionType, index) =>
        createSelectionTypeDataSet(results, selectionType, index)
      ),
    [results]
  );

  return (
    <Scatter
      data={{
        datasets: chartData,
      }}
    />
  );
};
