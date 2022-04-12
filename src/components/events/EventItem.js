import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import Card from '../UI/Card';
import Map from '../UI/Map';

import EventsForm from './EventsForm';

import { formatDate, request } from '../../utils/functions';

function EventItem({ event, showDetails, onReloadEvent }) {
  const navigate = useNavigate();

  const [showEditForm, setShowEditForm] = useState(false);

  const onDeleteHandler = () => {
    request(`/events/${event.event_id}`, 'DELETE')
      .then(() => {
        navigate('/events/all');
      })
      .catch(err => {
        console.log(err);
      });
  };

  const onMarkerClickHandler = e => {
    console.log(e);
  };

  const onMapClickHandler = e => {
    const { lat, lng } = e.latlng;

    const point = {
      name: `Točka ${event.points.length + 1}`,
      event_id: +event.event_id,
      serial_number: event.points.length,
      location_lat: lat,
      location_long: lng,
    };

    console.log(point);

    request(`/points/${event.event_id}`, 'PUT', {
      points: [...event.points, point],
    })
      .then(res => {
        console.log(res);
        onReloadEvent();
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <Card key={event.event_id}>
      <h2 className="bg-cyan-600 text-white rounded p-4 font-bold text-xl">
        {event.name}
      </h2>
      <p className="card-primary-text my-10 text-left">
        {formatDate(event.date)}
      </p>
      {showDetails && (
        <Map
          className="leaflet-event-container my-10"
          points={event.points}
          onMarkerClickHandler={onMarkerClickHandler}
          onMapClickHandler={onMapClickHandler}
        />
      )}
      {!showDetails && (
        <NavLink
          to={`/events/${event.event_id}`}
          className="button-outline font-normal"
        >
          Oglej si dogodek
        </NavLink>
      )}
      {showDetails && (
        <button className="button-danger mr-2 my-2" onClick={onDeleteHandler}>
          Izbriši dogodek
        </button>
      )}
      {showDetails && (
        <button
          className="button-warning my-2"
          onClick={() => setShowEditForm(prev => !prev)}
        >
          {showEditForm ? 'Zapri' : 'Uredi'}
        </button>
      )}
      {showDetails && (
        <EventsForm data={event} method="PUT" show={showEditForm} />
      )}
    </Card>
  );
}

export default EventItem;
