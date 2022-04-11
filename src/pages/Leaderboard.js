import { useState, useEffect } from 'react';

import useProtectedRoute from '../hooks/useProtectedRoute';

import { request } from '../utils/functions';

import SelectEvent from '../components/leaderboard/SelectEvent';
import LeaderboardList from '../components/leaderboard/LeaderboardList';

import Container from '../components/UI/Container';
import Card from '../components/UI/Card';
import Table from '../components/UI/Table';

function Leaderboard() {
  useProtectedRoute('required');

  const [events, setEvents] = useState([]);
  const [groups, setGroups] = useState([]);

  const [selectedEvent, setSelectedEvent] = useState('');

  useEffect(() => {
    request('/events')
      .then(data => {
        setEvents(data);
      })
      .catch(err => {
        console.log('Error fetching events', err);
      });
  }, []);

  const eventOnChangeHandler = event => {
    setSelectedEvent(event.target.value);
  };

  useEffect(() => {
    if (selectedEvent) {
      request(`/leaderboards/${selectedEvent}`)
        .then(data => {
          setGroups(data);
        })
        .catch(err => {
          console.log('Error fetching groups', err);
        });
    }
  }, [selectedEvent]);

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
        {/* Table */}
        {selectedEvent && groups && groups.length > 0 && (
          <Table fields={['#', 'Ime skupine', 'Čas hoje', 'Točke za odgovore']}>
            <LeaderboardList groups={groups} />
          </Table>
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
