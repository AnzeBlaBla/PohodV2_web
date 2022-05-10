import React from 'react';
import ReactDom from 'react-dom';

import { useGlobalContext } from '../../context/GlobalContext';

import Alert from './Alert';

export default function Notification() {
  const { notification } = useGlobalContext();

  return (
    <>
      {notification &&
        ReactDom.createPortal(
          <div className="fixed bottom-0 left-0 overflow-hidden z-[999] p-10">
            <Alert title={notification.title} type={notification.type} />
          </div>,
          document.getElementById('notification-root')
        )}
    </>
  );
}
