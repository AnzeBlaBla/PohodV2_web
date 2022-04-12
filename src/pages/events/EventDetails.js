import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import { request } from '../../utils/functions';

import EventItem from '../../components/events/EventItem';

function EventDetails() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);

  const getEvent = useCallback(() => {
    request(`/events/${id}`)
      .then(res => {
        setEvent(res);
      })
      .catch(err => console.log(err));
  }, [id]);

  useEffect(() => {
    getEvent();
  }, [getEvent]);

  const onReloadEventHandler = () => {
    getEvent();
  };

  return (
    <>
      {event && (
        <EventItem
          showDetails={true}
          event={event}
          onReloadEvent={onReloadEventHandler}
        />
      )}
    </>
  );
}

export default EventDetails;
