interface Route {
  name: string;
  path: string;
}

export const resultsRoot: Route = {
  name: "Results",
  path: "/results",
};

export const scatterPlot: Route = {
  name: "Scatterplot by Selection Type",
  path: resultsRoot.path + "/scatter",
};

export const selectionTypeBreakdown: Route = {
  name: "Breakdown by Selection Type",
  path: resultsRoot.path + "/line",
};

export const ageScatter: Route = {
  name: "Scatterplot by Age",
  path: resultsRoot.path + "/age-scatter",
};

export const ageDistribution: Route = {
  name: "Age Distribution",
  path: resultsRoot.path + "/age-distribution",
};

export const countryDistribution: Route = {
  name: "Country Distribution",
  path: resultsRoot.path + "/countries",
};

export const jsonPrint: Route = {
  name: "Results as JSON (non-cleaned)",
  path: resultsRoot.path + "/json",
};

export const allRoutes = [
  selectionTypeBreakdown,
  scatterPlot,
  ageScatter,
  ageDistribution,
  countryDistribution,
  jsonPrint,
];
