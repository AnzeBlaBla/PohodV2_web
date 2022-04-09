import { Routes, Route } from 'react-router-dom';

import Home from '../../pages/Home';
import Login from '../../pages/Login';
import Leaderboard from '../../pages/Leaderboard';
import Events from '../../pages/events/Events';
import NoPage from '../../pages/NoPage';

import { userTypes } from '../../utils/consts';

import useUser from '../../hooks/useUser';

function RoutesList() {
  const { user } = useUser();

  return (
    <Routes>
      {/* Home Page */}
      <Route exact path="/" element={<Home />} />
      {/* Login Page */}
      <Route exact path="/login" element={<Login />} />
      {/* Leaderboard Page */}
      <Route exact path="/leaderboard" element={<Leaderboard />} />
      {/* Events */}
      {user.user_type === userTypes.ADMIN && Object.keys(user).length > 0 && (
        <Route path="/events/*" element={<Events />} />
      )}
      {/* Groups */}
      {/* 404 Page */}
      <Route path="*" element={<NoPage />} />
    </Routes>
  );
}

export default RoutesList;
