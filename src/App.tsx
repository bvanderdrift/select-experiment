import React from "react";
import { Questionaire } from "./Questionaire";
import { DataPrint } from "./DataPrint";
import { Results } from "./Results";

function App() {
  return (
    <div className="fixed-top fixed-right fixed-bottom fixed-left d-flex justify-content-center align-items-start p-4 overflow-auto">
      <Results />
    </div>
  );
}

export default App;
