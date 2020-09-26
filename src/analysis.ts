import { SelectionType } from "./CountryPicker";

export interface ExperimentDataPoint {
  age: number;
  selectionType: SelectionType;
  optionCount: number;
  selectionTime: number;
  countryCode: string;
}

// Side-effects EVERYWHERE!
export const filterByType = (
  data: ExperimentDataPoint[],
  selectionType: SelectionType
) => data.filter((thing) => thing.selectionType === selectionType);

export const filterByTypeCount = (
  data: ExperimentDataPoint[],
  selectionType: SelectionType,
  optionCount: number
) =>
  filterByType(data, selectionType).filter(
    (thing) => thing.optionCount === optionCount
  );

export const getAverage = (subset: ExperimentDataPoint[]) =>
  subset.length === 0
    ? 0
    : subset.reduce((carry, next) => carry + next.selectionTime, 0) /
      subset.length;

// export const output = `category,# Data Points,Avg. Time-To-Selection
// Dropdown,${filterByType("Dropdown").length},${getAverage(
//   filterByType("Dropdown")
// )}
// Autocomplete,${filterByType("Autocomplete").length},${getAverage(
//   filterByType("Autocomplete")
// )}
// Visual Card,${filterByType("VisualCard").length},${getAverage(
//   filterByType("VisualCard")
// )}
// Textual Card,${filterByType("TextualCard").length},${getAverage(
//   filterByType("TextualCard")
// )}

// category,Dropdown,Autocomplete,Visual Card,Textual Card
// 3,${getAverage(filterByTypeCount("Dropdown", 3))},${getAverage(
//   filterByTypeCount("Autocomplete", 3)
// )},${getAverage(filterByTypeCount("VisualCard", 3))},${getAverage(
//   filterByTypeCount("TextualCard", 3)
// )}
// 5,${getAverage(filterByTypeCount("Dropdown", 5))},${getAverage(
//   filterByTypeCount("Autocomplete", 5)
// )},${getAverage(filterByTypeCount("VisualCard", 5))},${getAverage(
//   filterByTypeCount("TextualCard", 5)
// )}
// 8,${getAverage(filterByTypeCount("Dropdown", 8))},${getAverage(
//   filterByTypeCount("Autocomplete", 8)
// )},${getAverage(filterByTypeCount("VisualCard", 8))},${getAverage(
//   filterByTypeCount("TextualCard", 8)
// )}
// 13,${getAverage(filterByTypeCount("Dropdown", 13))},${getAverage(
//   filterByTypeCount("Autocomplete", 13)
// )},${getAverage(filterByTypeCount("VisualCard", 13))},${getAverage(
//   filterByTypeCount("TextualCard", 13)
// )}
// 21,${getAverage(filterByTypeCount("Dropdown", 21))},${getAverage(
//   filterByTypeCount("Autocomplete", 21)
// )},${getAverage(filterByTypeCount("VisualCard", 21))},${getAverage(
//   filterByTypeCount("TextualCard", 21)
// )}
// 34,${getAverage(filterByTypeCount("Dropdown", 34))},${getAverage(
//   filterByTypeCount("Autocomplete", 34)
// )},${getAverage(filterByTypeCount("VisualCard", 34))},${getAverage(
//   filterByTypeCount("TextualCard", 34)
// )}
// 55,${getAverage(filterByTypeCount("Dropdown", 55))},${getAverage(
//   filterByTypeCount("Autocomplete", 55)
// )},${getAverage(filterByTypeCount("VisualCard", 55))},${getAverage(
//   filterByTypeCount("TextualCard", 55)
// )}
// `;
