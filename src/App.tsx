import React from "react";
import { Questionaire } from "./Questionaire";
import { Results } from "./Results";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="fixed-top fixed-right fixed-bottom fixed-left d-flex justify-content-center align-items-start p-4 overflow-auto">
        <Switch>
          <Route path="/results">
            <Results />
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
