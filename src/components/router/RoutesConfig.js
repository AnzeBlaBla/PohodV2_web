import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from '../layouts/Navbar';

import Home from '../../pages/Home';
import Login from '../../pages/Login';
import Leaderboard from '../../pages/Leaderboard';
import Events from '../../pages/events/Events';
import NoPage from '../../pages/NoPage';

function RoutesConfig() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Home Page */}
        <Route exact path="/" element={<Home />} />
        {/* Login Page */}
        <Route exact path="/login" element={<Login />} />
        {/* Leaderboard Page */}
        <Route exact path="/leaderboard" element={<Leaderboard />} />
        {/* Events */}
        <Route path="/events/*" element={<Events />} />
        {/* 404 Page */}
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesConfig;
