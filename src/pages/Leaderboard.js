import { useState, useEffect } from 'react';

import { useGlobalContext } from '../context/GlobalContext';

import useProtectedRoute from '../hooks/useProtectedRoute';

import { request } from '../utils/functions';

import SelectEvent from '../components/leaderboard/SelectEvent';

import Container from '../components/UI/Container';
import Card from '../components/UI/Card';
import GridTable from '../components/UI/GridTable';

function Leaderboard() {
  useProtectedRoute('required');

  const { setShowLoadingSpinner, setDialog } = useGlobalContext();

  const [events, setEvents] = useState([]);
  const [groups, setGroups] = useState([]);

  const [selectedEvent, setSelectedEvent] = useState('');

  useEffect(() => {
    setShowLoadingSpinner(true);
    request('/events')
      .then(data => {
        setShowLoadingSpinner(false);
        setEvents(data);
      })
      .catch(err => {
        setShowLoadingSpinner(false);
        setDialog({
          title: 'Napaka pri pridobivanju dogodkov',
          text: 'Prišlo je do napake pri pridobivanju dogodkov. Poskusite znova.',
        });
      });
  }, [setShowLoadingSpinner, setDialog]);

  const eventOnChangeHandler = event => {
    setSelectedEvent(event.target.value);
  };

  useEffect(() => {
    if (selectedEvent) {
      setShowLoadingSpinner(true);
      request(`/leaderboards/${selectedEvent}`)
        .then(data => {
          setShowLoadingSpinner(false);

          const newData = data.map((item, index) => {
            return [
              index + 1,
              item.name,
              item.time,
              `${item.correct_answers} / ${item.possible_points}`,
            ];
          });

          setGroups(newData);
        })
        .catch(err => {
          setShowLoadingSpinner(false);
          setDialog({
            title: 'Napaka pri pridobivanju rezultatov',
            text: 'Prišlo je do napake pri pridobivanju rezultatov. Poskusite znova.',
          });
        });
    }
  }, [selectedEvent, setShowLoadingSpinner, setDialog]);

  return (
    <Container mode="page">
      <Card>
        {/* Title */}
        <h1 className="card-primary-title">Rezultati</h1>
        {/* Text */}
        <p className="card-primary-text">
          Prikaz rezultatov za posamezne dogodke.
        </p>
        {/* Select List */}
        <SelectEvent
          events={events}
          selectedEvent={selectedEvent}
          eventOnChangeHandler={eventOnChangeHandler}
        />
        <hr className="my-5"></hr>
        {/* Table */}
        {selectedEvent && groups && groups.length > 0 && (
          <GridTable
            data={groups}
            columns={['#', 'Ime skupine', 'Čas hoje', 'Točke za odgovore']}
            search={true}
            sort={true}
            resizable={true}
            pagination={{
              enabled: true,
              limit: 10,
            }}
          />
        )}
        {/* No Results */}
        {selectedEvent !== '' && groups && groups.length < 1 && (
          <p className="card-primary-text">Ni rezultatov za prikaz!</p>
        )}
      </Card>
    </Container>
  );
}

export default Leaderboard;
