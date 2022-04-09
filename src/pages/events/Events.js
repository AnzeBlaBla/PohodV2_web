import { useEffect } from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';

import AllEvents from './AllEvents';
import NewEvent from './NewEvent';

import Container from '../../components/UI/Container';
import Card from '../../components/UI/Card';

function Events() {
  const navigate = useNavigate();

  const menuLinkStyles = ({ isActive = false }) =>
    isActive
      ? 'button-outline text-white bg-blue-700 mr-5'
      : 'button-outline mr-5';

  useEffect(() => {
    navigate('/events/all');
  }, [navigate]);

  return (
    <Container mode="page">
      <Card>
        <div className="my-5 mt-10 flex  items-center">
          <NavLink to="/events/all" className={menuLinkStyles}>
            Vsi Dogodki
          </NavLink>
          <NavLink to="/events/new" className={menuLinkStyles}>
            Nov Dogodek
          </NavLink>
        </div>

        <Routes>
          <Route path="all" element={<AllEvents />} />
          <Route path="new" element={<NewEvent />} />
        </Routes>
      </Card>
    </Container>
  );
}

export default Events;
