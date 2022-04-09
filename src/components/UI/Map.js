import React from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';

const position = [46.386079810551266, 15.087464857546308];

function Map({ points = [] }) {
  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {points.map(point => (
        <Marker position={[point.latitude, point.longitude]} key={point.id}>
          <Popup>
            <span>{point.name}</span>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;
