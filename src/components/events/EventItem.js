import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { useGlobalContext } from '../../context/GlobalContext';

import Card from '../UI/Card';
import Map from '../UI/Map';

import EventsForm from './EventsForm';

import { formatDate, request } from '../../utils/functions';

function EventItem({ event, showDetails, onReloadEvent }) {
  const navigate = useNavigate();

  const { setShowLoadingSpinner } = useGlobalContext();

  const [showEditForm, setShowEditForm] = useState(false);

  const onDeleteHandler = () => {
    setShowLoadingSpinner(true);
    request(`/events/${event.event_id}`, 'DELETE')
      .then(() => {
        setShowLoadingSpinner(false);
        navigate('/events/all');
      })
      .catch(err => {
        setShowLoadingSpinner(false);
        console.log(err);
      });
  };

  const postPoints = points => {
    setShowLoadingSpinner(true);
    request(`/points/${event.event_id}`, 'PUT', {
      points,
    })
      .then(res => {
        setShowLoadingSpinner(false);
        onReloadEvent();
      })
      .catch(e => {
        setShowLoadingSpinner(false);
        console.log(e);
      });
  };

  const onMarkerClickHandler = e => {
    const updatedPoints = event.points.filter(point => point.point_id !== e);
    postPoints(updatedPoints);
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

    postPoints([...event.points, point]);
  };

  return (
    <>
      <Card key={event.event_id}>
        <h2 className="bg-cyan-600 text-white rounded p-4 font-bold text-xl prevent-invert">
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
      </Card>
      {showDetails && (
        <EventsForm data={event} method="PUT" show={showEditForm} />
      )}
    </>
  );
}

export default EventItem;
