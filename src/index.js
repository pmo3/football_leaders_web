import React from "react";
import ReactDOM from "react-dom";
import MapChart from "./map_chart";

function App() {
  return (
    <div>
      <MapChart />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
