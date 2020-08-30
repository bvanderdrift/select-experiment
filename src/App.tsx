import React from "react";
import { Questionaire } from "./Questionaire";
import { TimeOptionsPlot } from "./results/TimeOptionsPlot";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AgeDistribution } from "./results/AgeDistribution";
import { TimeDistribution } from "./results/TimeDistribution";

function App() {
  return (
    <BrowserRouter>
      <div className="fixed-top fixed-right fixed-bottom fixed-left d-flex justify-content-center align-items-start p-4 overflow-auto">
        <Switch>
          <Route path="/results/time-options">
            <TimeOptionsPlot />
          </Route>
          <Route path="/results/time-distribution">
            <TimeDistribution />
          </Route>
          <Route path="/results/age-distribution">
            <AgeDistribution />
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
