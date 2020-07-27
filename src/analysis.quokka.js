const json =
  '[{"age":27,"selectionType":"Dropdown","countryCode":"NL","optionCount":34,"selectionTime":7755},{"age":29,"selectionType":"VisualCard","countryCode":"NL","optionCount":5,"selectionTime":4030},{"selectionType":"VisualCard","age":26,"selectionTime":10618,"optionCount":55,"countryCode":"NL"},{"countryCode":"NL","age":26,"selectionType":"Autocomplete","optionCount":34,"selectionTime":3772},{"age":28,"optionCount":3,"selectionTime":1642,"selectionType":"VisualCard","countryCode":"NL"},{"countryCode":"NL","optionCount":5,"selectionTime":7545,"selectionType":"Dropdown","age":29},{"optionCount":34,"age":24,"selectionTime":9758,"selectionType":"VisualCard","countryCode":"NL"},{"optionCount":34,"selectionTime":9220,"countryCode":"NL","selectionType":"TextualCard","age":28},{"optionCount":3,"age":28,"countryCode":"NL","selectionType":"VisualCard","selectionTime":1446},{"age":24,"countryCode":"NL","selectionTime":7862,"optionCount":21,"selectionType":"Dropdown"},{"optionCount":55,"selectionType":"Autocomplete","selectionTime":5970,"countryCode":"NL","age":28},{"optionCount":13,"countryCode":"NL","selectionTime":3431,"age":27,"selectionType":"VisualCard"},{"age":27,"countryCode":"NL","optionCount":3,"selectionTime":3443,"selectionType":"TextualCard"},{"selectionType":"Autocomplete","selectionTime":4329,"age":24,"optionCount":34,"countryCode":"NL"},{"selectionTime":4122,"countryCode":"NL","age":24,"optionCount":13,"selectionType":"TextualCard"},{"selectionType":"VisualCard","optionCount":3,"countryCode":"NL","age":26,"selectionTime":1358},{"age":19,"selectionType":"Autocomplete","optionCount":21,"selectionTime":4611,"countryCode":"NL"},{"selectionType":"Autocomplete","age":19,"optionCount":55,"selectionTime":4153,"countryCode":"NL"},{"age":19,"selectionTime":2963,"countryCode":"NL","selectionType":"Dropdown","optionCount":5},{"countryCode":"NL","selectionType":"Dropdown","selectionTime":3444,"optionCount":5,"age":23},{"countryCode":"NL","age":28,"selectionType":"Autocomplete","selectionTime":7118,"optionCount":5},{"selectionType":"Dropdown","countryCode":"NL","age":29,"selectionTime":4133,"optionCount":8},{"selectionTime":4858,"countryCode":"NL","selectionType":"VisualCard","optionCount":55,"age":24},{"selectionType":"VisualCard","age":26,"optionCount":21,"countryCode":"NL","selectionTime":2124},{"age":26,"selectionType":"VisualCard","countryCode":"NL","selectionTime":1250,"optionCount":3},{"selectionTime":2545,"age":19,"optionCount":8,"selectionType":"TextualCard","countryCode":"NL"},{"optionCount":55,"selectionTime":10782,"selectionType":"Dropdown","countryCode":"NL","age":23},{"optionCount":3,"age":26,"selectionTime":2750,"countryCode":"NL","selectionType":"Dropdown"},{"age":26,"selectionType":"Autocomplete","selectionTime":4530,"countryCode":"NL","optionCount":55},{"countryCode":"NL","optionCount":21,"selectionType":"VisualCard","selectionTime":4089,"age":24},{"countryCode":"NL","selectionType":"Dropdown","optionCount":55,"selectionTime":4022,"age":24},{"countryCode":"NL","age":24,"selectionType":"Dropdown","optionCount":55,"selectionTime":12337},{"countryCode":"NL","selectionTime":4970,"selectionType":"TextualCard","age":29,"optionCount":13},{"selectionType":"Autocomplete","age":28,"countryCode":"NL","optionCount":8,"selectionTime":4146},{"age":23,"selectionTime":5962,"optionCount":3,"countryCode":"NL","selectionType":"Autocomplete"},{"selectionType":"VisualCard","optionCount":55,"countryCode":"NL","selectionTime":9784,"age":28},{"selectionTime":4822,"age":19,"selectionType":"Autocomplete","optionCount":34,"countryCode":"NL"},{"selectionTime":2677,"countryCode":"NL","selectionType":"Dropdown","optionCount":3,"age":24},{"selectionTime":3564,"optionCount":21,"selectionType":"Autocomplete","age":28,"countryCode":"NL"},{"selectionType":"Autocomplete","optionCount":8,"countryCode":"NL","age":19,"selectionTime":4290},{"selectionType":"VisualCard","countryCode":"NL","optionCount":5,"age":24,"selectionTime":1867},{"selectionType":"TextualCard","optionCount":3,"selectionTime":4909,"countryCode":"NL","age":24},{"selectionTime":7370,"countryCode":"NL","selectionType":"Dropdown","age":28,"optionCount":21},{"age":27,"selectionTime":13469,"optionCount":55,"countryCode":"NL","selectionType":"Dropdown"},{"countryCode":"NL","selectionType":"VisualCard","age":28,"optionCount":13,"selectionTime":3298},{"optionCount":34,"selectionTime":6896,"countryCode":"NL","selectionType":"TextualCard","age":26},{"selectionType":"Autocomplete","selectionTime":3007,"optionCount":3,"countryCode":"NL","age":19},{"selectionType":"VisualCard","optionCount":55,"age":27,"countryCode":"IE","selectionTime":6623},{"age":26,"selectionTime":2175,"optionCount":13,"selectionType":"VisualCard","countryCode":"NL"},{"countryCode":"NL","selectionTime":5421,"age":19,"selectionType":"Autocomplete","optionCount":3},{"countryCode":"NL","selectionType":"TextualCard","optionCount":3,"age":28,"selectionTime":1867},{"age":19,"selectionTime":3320,"selectionType":"VisualCard","optionCount":21,"countryCode":"NL"},{"age":26,"countryCode":"NL","selectionTime":2095,"selectionType":"TextualCard","optionCount":5},{"age":23,"selectionType":"VisualCard","selectionTime":1654,"countryCode":"NL","optionCount":5},{"age":29,"selectionTime":9311,"selectionType":"VisualCard","countryCode":"NL","optionCount":55}]';

const data = JSON.parse(json);

// Side-effects EVERYWHERE!
const filterByType = (selectionType) =>
  data.filter((thing) => thing.selectionType === selectionType);

const filterByTypeCount = (selectionType, optionCount) =>
  filterByType(selectionType).filter(
    (thing) => thing.optionCount === optionCount
  );

const getAverage = (subset) =>
  subset.length === 0
    ? 0
    : subset.reduce((carry, next) => carry + next.selectionTime, 0) /
      subset.length;

console.log(`category,# Data Points,Avg. Time-To-Selection
Dropdown,${filterByType("Dropdown").length},${getAverage(
  filterByType("Dropdown")
)}
Autocomplete,${filterByType("Autocomplete").length},${getAverage(
  filterByType("Autocomplete")
)}
Visual Card,${filterByType("VisualCard").length},${getAverage(
  filterByType("VisualCard")
)}
Textual Card,${filterByType("TextualCard").length},${getAverage(
  filterByType("TextualCard")
)}

category,Dropdown,Autocomplete,Visual Card,Textual Card
3,${getAverage(filterByTypeCount("Dropdown", 3))},${getAverage(
  filterByTypeCount("Autocomplete", 3)
)},${getAverage(filterByTypeCount("VisualCard", 3))},${getAverage(
  filterByTypeCount("TextualCard", 3)
)}
5,${getAverage(filterByTypeCount("Dropdown", 5))},${getAverage(
  filterByTypeCount("Autocomplete", 5)
)},${getAverage(filterByTypeCount("VisualCard", 5))},${getAverage(
  filterByTypeCount("TextualCard", 5)
)}
8,${getAverage(filterByTypeCount("Dropdown", 8))},${getAverage(
  filterByTypeCount("Autocomplete", 8)
)},${getAverage(filterByTypeCount("VisualCard", 8))},${getAverage(
  filterByTypeCount("TextualCard", 8)
)}
13,${getAverage(filterByTypeCount("Dropdown", 13))},${getAverage(
  filterByTypeCount("Autocomplete", 13)
)},${getAverage(filterByTypeCount("VisualCard", 13))},${getAverage(
  filterByTypeCount("TextualCard", 13)
)}
21,${getAverage(filterByTypeCount("Dropdown", 21))},${getAverage(
  filterByTypeCount("Autocomplete", 21)
)},${getAverage(filterByTypeCount("VisualCard", 21))},${getAverage(
  filterByTypeCount("TextualCard", 21)
)}
34,${getAverage(filterByTypeCount("Dropdown", 34))},${getAverage(
  filterByTypeCount("Autocomplete", 34)
)},${getAverage(filterByTypeCount("VisualCard", 34))},${getAverage(
  filterByTypeCount("TextualCard", 34)
)}
55,${getAverage(filterByTypeCount("Dropdown", 55))},${getAverage(
  filterByTypeCount("Autocomplete", 55)
)},${getAverage(filterByTypeCount("VisualCard", 55))},${getAverage(
  filterByTypeCount("TextualCard", 55)
)}
`);
