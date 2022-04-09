import { useState, useEffect } from 'react';

import useProtectedRoute from '../hooks/useProtectedRoute';

import { request } from '../utils/functions';

import Container from '../components/UI/Container';
import Card from '../components/UI/Card';

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
        <div className="flex justify-center">
          <div className="mb-3 xl:w-96">
            <select
              className="select focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              onChange={eventOnChangeHandler}
              value={selectedEvent}
            >
              <option value={''}>Izberite dogodek</option>
              {events.map(event => (
                <option key={event.event_id} value={event.event_id}>
                  {event.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Table */}
        {groups && groups.length > 0 && (
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full">
                    <thead className="bg-white border-b">
                      <tr>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          #
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Ime skupine
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Čas hoje
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Točke za odgovore
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {groups.map((group, index) => {
                        return (
                          <tr
                            className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                            key={group.name}
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {index + 1}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {group.name}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {group.time}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {group.correct_answers} / {group.possible_points}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
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
