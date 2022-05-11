import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import { useGlobalContext } from '../../context/GlobalContext';

import { request } from '../../utils/functions';

import EventItem from '../../components/events/EventItem';

function EventDetails() {
  const { id } = useParams();

  const { setShowLoadingSpinner, setDialog } = useGlobalContext();

  const [event, setEvent] = useState(null);

  const getEvent = useCallback(() => {
    setShowLoadingSpinner(true);
    request(`/events/${id}`)
      .then(res => {
        setShowLoadingSpinner(false);
        setEvent(res);
      })
      .catch(err => {
        setShowLoadingSpinner(false);
        setDialog({
          title: 'Napaka pri pridobivanju dogodka',
          text: 'Prišlo je do napake pri pridobivanju dogodka. Poskusite znova.',
        });
      });
  }, [id, setShowLoadingSpinner, setDialog]);

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
