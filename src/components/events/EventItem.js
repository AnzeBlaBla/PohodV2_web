import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import Card from '../UI/Card';
import Map from '../UI/Map';

import EventsForm from './EventsForm';

import { formatDate, request } from '../../utils/functions';

function EventItem({ event, showDetails }) {
  const navigate = useNavigate();

  const onDeleteHandler = () => {
    request(`/events/${event.event_id}`, 'DELETE')
      .then(() => {
        navigate('/events/all');
      })
      .catch(err => {
        console.log(err);
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
        <Map className="leaflet-event-container my-10" points={event.points} />
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
        <button className="button-warning my-2" onClick={onDeleteHandler}>
          Uredi
        </button>
      )}
      {showDetails && <EventsForm data={event} method="PUT" />}
    </Card>
  );
}

export default EventItem;
