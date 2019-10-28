import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";
import League from "./league";

const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const MapChart = () => {
  const [mapItems, setMapItems] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3090/map_items")
        .then(function(response) {
          setMapItems(response.data);
        });
  }, []);



  return (
    <ComposableMap projection="geoAzimuthalEqualArea"
      projectionConfig={{
        rotate: [-20.0, -52.0, 0],
        scale: 1000
      }} >
      <Geographies geography={geoUrl}>
        { ({geographies}) =>
          geographies.map(geo => (
            <Geography key={geo.rsmKey}
                       geography={geo}
                       fill="#9998A3"
                       stroke="#fff"
            />
          ))
        }
      </Geographies>

      {mapItems.map(mapItem => (
        <League mapItem={mapItem} key={mapItem.league.country}></League>
      ))}

    </ComposableMap>
  );
};



export default MapChart;
