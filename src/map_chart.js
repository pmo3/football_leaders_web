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
    axios.get(process.env.REACT_APP_API_URL)
        .then(function(response) {
          setMapItems(response.data);
        });
  }, []);

  const [countryColors, setCountryColors] = useState([]);
  useEffect(() => {
    const colors = prepCountryColors(mapItems)
    setCountryColors(colors);
  }, [mapItems]);

  const prepCountryColors = function(mapItems) {
    const colors = mapItems.reduce(function(result, item, index) {
      const team = item.leader ? item.leader : {};
      const color = team.color != null ? team.color : "#9998A3";
      result[item.league.country] = color;
      return result
    }, {});
    return colors;
  }

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
                       fill={countryColors[geo.properties.NAME] || "#9998A3"}
                       stroke="#dcdcdf"
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
