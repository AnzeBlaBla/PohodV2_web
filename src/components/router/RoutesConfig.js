import { BrowserRouter } from 'react-router-dom';

import RoutesList from './RoutesList';

function RoutesConfig() {
  return (
    <BrowserRouter>
      <RoutesList />
    </BrowserRouter>
  );
}

export default RoutesConfig;
