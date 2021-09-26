/* eslint-disable react/prop-types */

import React from "react";
import { Circle, LayerGroup, LayersControl, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Link } from "react-router-dom"; 

// Marker icon fix for React (source: https://bit.ly/39AdJb9)
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [13, 40] // Center icons (source: https://bit.ly/3AKGgXw)
});
L.Marker.prototype.options.icon = DefaultIcon;

// Types of markers.
const types = ["school", "work", "interest"];

/**
 * Display a map with a set of markers at a given location.
 * 
 * @param {location, markers} param0 - default location, and markers for map.
 * @returns Leaflet map with markers.
 */
const MarkerMap = ({ location, markers }) => {
    return (
      <MapContainer center={ location } scrollWheelZoom={ false } zoom={ 13 }>
        <LayersControl position="topright">
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {types.map(t => (
            <LayersControl.Overlay checked key={ t } name={ t }>
              <LayerGroup>
                {  
                        markers.filter(({ type }) => t == type)
                        .map(marker => (
                          <MapMarker { ...marker } key={ t } />
                        ))
                        }
              </LayerGroup>
            </LayersControl.Overlay>
                ))}
        </LayersControl>
      </MapContainer>
    );
};

// Color dictionary for markers.
const colors = {
    school: "red",
    work: "green",
    interest: "purple"
};

/**
 * Constructs the customized marker for each location.
 * @param {name, position, image, type} param0 
 * @returns Leaflet marker with popup.
 */
const MapMarker = ({ name, position, image, type }) => (
  <Marker key={ name } position={ position }>
    <Popup>
      <img
        alt={ name }
        src={ image }
        style={ {
                    height: "50px",
                    justifyContent: "center",
                    alignItems: "center",
                } }
      />
      <br />
      {name}
      <br />
      <Link to={ "/dice" }> See more</Link>
    </Popup>
    <Circle
      center={ position }
      pathOptions={ { color: colors[type], fillColor: colors[type] } }
      radius={ 100 }
      weight={ 5 }
    />
  </Marker>
);

export default MarkerMap;
