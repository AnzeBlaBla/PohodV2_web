import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const position = [46.386079810551266, 15.087464857546308];

function Map({ points = [], className = 'leaflet-container' } = {}) {
  return (
    <div className={className}>
      <MapContainer
        className={className}
        center={position}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {points.map(point => (
          <Marker
            position={[+point.location_lat, +point.location_long]}
            key={point.point_id}
          >
            <Popup>
              <span>{point.name}</span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;
