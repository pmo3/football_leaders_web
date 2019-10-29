import React from "react";
import ReactDOM from "react-dom";
import MapChart from "./map_chart";
import './index.css';

function App() {
  return (
    <div>
      <MapChart />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
