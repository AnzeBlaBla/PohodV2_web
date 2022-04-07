import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from '../layouts/Navbar';

import Home from '../../pages/Home';
import Login from '../../pages/Login';
import NoPage from '../../pages/NoPage';

function RoutesConfig() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesConfig;
