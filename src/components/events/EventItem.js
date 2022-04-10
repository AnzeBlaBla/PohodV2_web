import React from 'react';
import { NavLink } from 'react-router-dom';

import Card from '../UI/Card';

import { formatDate } from '../../utils/functions';

function EventItem({ event }) {
  return (
    <Card key={event.event_id}>
      <h2 className="bg-cyan-600 text-white rounded p-4 font-bold text-xl">
        {event.name}
      </h2>
      <p className="card-primary-text my-10 text-left">
        {formatDate(event.date)}
      </p>
      <NavLink
        to={`/events/${event.event_id}`}
        className="button-outline font-normal"
      >
        Oglej si dogodek
      </NavLink>
    </Card>
  );
}

export default EventItem;
