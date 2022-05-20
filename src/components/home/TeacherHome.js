import React, { useEffect, useState } from 'react';

import { useGlobalContext } from '../../context/GlobalContext';

import { request } from '../../utils/functions';

import Container from '../UI/Container';
import Card from '../UI/Card';

import SelectEvent from '../leaderboard/SelectEvent';

const Map = React.lazy(() => import('../UI/Map'));

function TeacherHome() {
  const { setShowLoadingSpinner, setDialog } = useGlobalContext();

  const [events, setEvents] = useState([]);
  const [points, setPoints] = useState([]);

  const [selectedEvent, setSelectedEvent] = useState('');

  useEffect(() => {
    setShowLoadingSpinner(true);
    request('/events')
      .then(data => {
        setShowLoadingSpinner(false);
        setEvents(data);
      })
      .catch(err => {});
  }, [setShowLoadingSpinner, setDialog]);

  const eventOnChangeHandler = event => {
    setSelectedEvent(event.target.value);
  };

  useEffect(() => {
    if (selectedEvent) {
      setShowLoadingSpinner(true);
      request(`/events/${selectedEvent}/tracking`)
        .then(data => {
          setShowLoadingSpinner(false);

          setPoints(
            data.map(group => ({ ...group.point, name: group.group.name }))
          );
        })
        .catch(err => {
          setShowLoadingSpinner(false);
          setDialog({
            title: 'Napaka pri pridobivanju obiskanih točk skupin',
            text: 'Prišlo je do napake pri pridobivanju obiskanih točk skupin. Poskusite znova.',
          });
        });
    }
  }, [selectedEvent, setShowLoadingSpinner, setDialog]);

  return (
    <>
      {points.length < 1 && (
        <Container mode="page">
          <Card>
            {/* Title */}
            <h1 className="card-primary-title">Zadnje obiskane točke skupin</h1>
            {/* Text */}
            <p className="card-primary-text">
              Prikaz zadnjih obiskanih točk skupin.
            </p>
            {/* Select List */}
            <SelectEvent
              events={events}
              selectedEvent={selectedEvent}
              eventOnChangeHandler={eventOnChangeHandler}
            />
            <hr className="my-5"></hr>
          </Card>
        </Container>
      )}
      {points.length > 0 && <Map points={points} />}
    </>
  );
}

export default TeacherHome;
