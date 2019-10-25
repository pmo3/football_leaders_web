import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";

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
        <Marker key={mapItem.league.country} coordinates={[mapItem.league.lng, mapItem.league.lat]}>
            <image xlinkHref={mapItem.leader ? mapItem.leader.logo_url : ""}
            transform={`translate(-${mapItem.size /
                              2}, -${mapItem.size / 2})`}
                          height={mapItem.size}
                          width={mapItem.size}/>
          </Marker>
      ))}

    </ComposableMap>
  );
};

export default MapChart;
