import React from 'react';

import EventItem from './EventItem';

function EventsList({ events }) {
  return (
    <>
      {events.map(event => (
        <EventItem key={event.event_id} event={event} />
      ))}
    </>
  );
}

export default EventsList;
