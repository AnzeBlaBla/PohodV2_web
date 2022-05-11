import React from 'react';

import { GlobalContextProvider } from './context/GlobalContext';

import RoutesConfig from './components/router/RoutesConfig';

import LoadingSpinner from './components/UI/LoadingSpinner';
import Notification from './components/UI/Notification';
import Modal from './components/UI/Modal';

function App() {
  return (
    <>
      <GlobalContextProvider>
        <LoadingSpinner />
        <Notification />
        <Modal />

        <RoutesConfig />
      </GlobalContextProvider>
    </>
  );
}

export default App;
