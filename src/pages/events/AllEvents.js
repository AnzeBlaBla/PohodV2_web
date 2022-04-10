import { useState, useEffect } from 'react';

import EventsList from '../../components/events/EventsList';

import { request } from '../../utils/functions';

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

  return <EventsList events={events} />;
}

export default AllEvents;
