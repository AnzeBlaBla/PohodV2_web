import { Routes, Route } from 'react-router-dom';

import useProtectedRoute from '../../hooks/useProtectedRoute';

import AllEvents from './AllEvents';
import NewEvent from './NewEvent';

import EventsNavigation from '../../components/events/EventsNavigation';

import Container from '../../components/UI/Container';
import Card from '../../components/UI/Card';

function Events() {
  useProtectedRoute('required');

  return (
    <Container mode="page">
      <Card>
        <EventsNavigation />
        <Routes>
          <Route path="all" element={<AllEvents />} />
          <Route path="new" element={<NewEvent />} />
        </Routes>
      </Card>
    </Container>
  );
}

export default Events;
