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
          <div className="absolute top-0 left-0 w-screen h-screen overflow-hidden z-[999]">
            <div className="flex justify-start items-end w-full h-full p-10">
              <Alert title={notification.title} type={notification.type} />
            </div>
          </div>,
          document.getElementById('notification-root')
        )}
    </>
  );
}
