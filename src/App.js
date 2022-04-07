import React from 'react';

import { GlobalContextProvider } from './context/GlobalContext';

import RoutesConfig from './components/router/RoutesConfig';

function App() {
  return (
    <>
      <GlobalContextProvider>
        <RoutesConfig />
      </GlobalContextProvider>
    </>
  );
}

export default App;
