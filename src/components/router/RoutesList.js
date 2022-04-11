import { Routes, Route } from 'react-router-dom';

import Home from '../../pages/Home';
import Login from '../../pages/Login';
import Leaderboard from '../../pages/Leaderboard';
import Events from '../../pages/events/Events';
import NoPage from '../../pages/NoPage';

import Navbar from '../layouts/Navbar';

import { userTypes } from '../../utils/consts';

import useUser from '../../hooks/useUser';

function RoutesList() {
  const { user } = useUser();

  const userExists = () => Object.keys(user).length > 0;

  return (
    <>
      {/* Navbar */}
      <Navbar user={user} />
      <Routes>
        {/* Home Page */}
        {userExists() && (
          <Route exact path="/" element={<Home user={user} />} />
        )}
        {/* Login Page */}
        <Route exact path="/login" element={<Login />} />
        {/* Leaderboard Page */}
        {userExists() && (
          <Route exact path="/leaderboard" element={<Leaderboard />} />
        )}
        {/* Events */}
        {userExists() &&
          user.user_type === userTypes.ADMIN &&
          Object.keys(user).length > 0 && (
            <Route path="/events/*" element={<Events />} />
          )}
        {/* Groups */}
        {/* 404 Page */}
        <Route path="*" element={<NoPage />} />
      </Routes>
    </>
  );
}

export default RoutesList;
