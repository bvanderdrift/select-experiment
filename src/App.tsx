import React from "react";
import { Questionaire } from "./Questionaire";
import { Lined } from "./results/Lined";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { AgeDistribution } from "./results/AgeDistribution";
import { Scattered } from "./results/Scattered";
import { JSONed } from "./results/JSONed";
import { AgeScattered } from "./results/AgeScattered";
import { Countries } from "./results/Countries";
import {
  selectionTypeBreakdown,
  scatterPlot,
  ageScatter,
  ageDistribution,
  jsonPrint,
  countryDistribution,
  allRoutes,
} from "./results/routes";

function App() {
  return (
    <BrowserRouter>
      <div className="fixed-top fixed-right fixed-bottom fixed-left d-flex justify-content-center align-items-start p-4 overflow-auto">
        <Switch>
          <Route path="/results">
            <Switch>
              <Route path={selectionTypeBreakdown.path}>
                <Lined />
              </Route>
              <Route path={scatterPlot.path}>
                <Scattered />
              </Route>
              <Route path={ageScatter.path}>
                <AgeScattered />
              </Route>
              <Route path={ageDistribution.path}>
                <AgeDistribution />
              </Route>
              <Route path={jsonPrint.path}>
                <JSONed />
              </Route>
              <Route path={countryDistribution.path}>
                <Countries />
              </Route>
              <Route>
                <div>
                  <h2>All Result Visualizations</h2>
                  {allRoutes.map((route, index) => (
                    <li key={index}>
                      <a href={window.location.origin + route.path}>
                        {route.name}
                      </a>
                    </li>
                  ))}
                </div>
              </Route>
            </Switch>
          </Route>
          <Route>
            <Questionaire />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
