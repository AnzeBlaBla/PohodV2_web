import React from 'react';
import { useParams } from 'react-router-dom';

import useRequest from '../../hooks/useRequest';

import EventItem from '../../components/events/EventItem';

function EventDetails() {
  const { id } = useParams();

  const { data, error, loading } = useRequest(`/events/${id}`);

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {data && <EventItem showDetails={true} event={data} />}
    </>
  );
}

export default EventDetails;
