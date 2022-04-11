import { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import useProtectedRoute from '../../hooks/useProtectedRoute';

import AllEvents from './AllEvents';
import NewEvent from './NewEvent';

import EventsNavigation from '../../components/events/EventsNavigation';

import Container from '../../components/UI/Container';
import Card from '../../components/UI/Card';

function Events() {
  useProtectedRoute('required');

  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/events') {
      navigate('/events/all');
    }
  }, [pathname, navigate]);

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
