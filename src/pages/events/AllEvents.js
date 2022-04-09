import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import Card from '../../components/UI/Card';

import { request, formatDate } from '../../utils/functions';

function AllEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    request('/events')
      .then(response => {
        setEvents(response);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {events.map(event => (
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
      ))}
    </>
  );
}

export default AllEvents;
