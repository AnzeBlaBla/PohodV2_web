import React from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet';

const position = [46.386079810551266, 15.087464857546308];

function HandleMapClick({ onMapClickHandler }) {
  useMapEvents({
    click: onMapClickHandler,
  });
  return null;
}

function Map({
  points = [],
  className = 'leaflet-container',
  onMarkerClickHandler,
  onMapClickHandler,
} = {}) {
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
        <HandleMapClick onMapClickHandler={onMapClickHandler} />
        {points.map(point => (
          <Marker
            position={[+point.location_lat, +point.location_long]}
            key={point.point_id}
          >
            <Popup>
              <p>{point.name}</p>
              {onMarkerClickHandler && (
                <button
                  className="button-danger"
                  onClick={onMarkerClickHandler.bind(null, point.point_id)}
                >
                  Izbriši
                </button>
              )}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;
