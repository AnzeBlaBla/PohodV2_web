import { BrowserRouter } from 'react-router-dom';

import Navbar from '../layouts/Navbar';
import RoutesList from './RoutesList';

function RoutesConfig() {
  return (
    <BrowserRouter>
      <Navbar />
      <RoutesList />
    </BrowserRouter>
  );
}

export default RoutesConfig;
