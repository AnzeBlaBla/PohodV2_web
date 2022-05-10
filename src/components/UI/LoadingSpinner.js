import React from 'react';
import ReactDom from 'react-dom';

import { useGlobalContext } from '../../context/GlobalContext';

export default function LoadingSpinner() {
  const { showLoadingSpinner } = useGlobalContext();

  return (
    <>
      {showLoadingSpinner &&
        ReactDom.createPortal(
          <div className="absolute top-0 left-0 w-screen h-screen overflow-hidden z-[999]">
            <div className="flex justify-center items-center w-full h-full bg-black/75 ">
              <span className="inline-block bg-blue-700 w-4 h-4 rounded-full mx-2 animate-bounce"></span>
              <span
                className="inline-block bg-blue-900 w-4 h-4 rounded-full mx-2 animate-bounce"
                style={{ animationDelay: '500ms' }}
              ></span>
              <span
                className="inline-block bg-blue-500 w-4 h-4 rounded-full mx-2 animate-bounce delay-300"
                style={{ animationDelay: '750ms' }}
              ></span>
            </div>
          </div>,
          document.getElementById('spinner-root')
        )}
    </>
  );
}
