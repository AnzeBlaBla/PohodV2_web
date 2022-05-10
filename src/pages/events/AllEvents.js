import { useState, useEffect } from 'react';

import { useGlobalContext } from '../../context/GlobalContext';

import EventsList from '../../components/events/EventsList';

import { request } from '../../utils/functions';

function AllEvents() {
  const { setShowLoadingSpinner } = useGlobalContext();

  const [events, setEvents] = useState([]);

  useEffect(() => {
    setShowLoadingSpinner(true);
    request('/events')
      .then(response => {
        setShowLoadingSpinner(false);
        setEvents(response);
      })
      .catch(error => {
        setShowLoadingSpinner(false);
        console.log(error);
      });
  }, [setShowLoadingSpinner]);

  return <EventsList events={events} />;
}

export default AllEvents;
