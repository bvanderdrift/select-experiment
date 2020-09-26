import React from "react";
import { Questionaire } from "./Questionaire";
import { Lined } from "./results/Lined";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AgeDistribution } from "./results/AgeDistribution";
import { Scattered } from "./results/Scattered";
import { JSONed } from "./results/JSONed";
import { AgeScattered } from "./results/AgeScattered";

function App() {
  return (
    <BrowserRouter>
      <div className="fixed-top fixed-right fixed-bottom fixed-left d-flex justify-content-center align-items-start p-4 overflow-auto">
        <Switch>
          <Route path="/results">
            <Route path="/results/line">
              <Lined />
            </Route>
            <Route path="/results/scatter">
              <Scattered />
            </Route>
            <Route path="/results/age-scatter">
              <AgeScattered />
            </Route>
            <Route path="/results/age-distribution">
              <AgeDistribution />
            </Route>
            <Route path="/results/json">
              <JSONed />
            </Route>
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
