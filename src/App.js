import React from 'react';

import { GlobalContextProvider } from './context/GlobalContext';

import RoutesConfig from './components/router/RoutesConfig';
import LoadingSpinner from './components/UI/LoadingSpinner';

function App() {
  return (
    <>
      <GlobalContextProvider>
        <LoadingSpinner />
        <RoutesConfig />
      </GlobalContextProvider>
    </>
  );
}

export default App;
