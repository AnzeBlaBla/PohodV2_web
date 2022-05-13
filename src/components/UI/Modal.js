import React from 'react';
import ReactDom from 'react-dom';

import { useGlobalContext } from '../../context/GlobalContext';

export default function Modal() {
  const { setDialog, dialog } = useGlobalContext();

  return (
    <>
      {dialog &&
        ReactDom.createPortal(
          <div className="fixed top-0 left-0 w-screen h-screen overflow-hidden z-[998]">
            <div
              className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-black/75 p-5"
              onClick={e => {
                setDialog(null);
              }}
            >
              <div
                className="bg-white py-5 px-10 w-full max-w-xl"
                onClick={e => e.stopPropagation()}
              >
                <h2 className="mb-10 mt-5 text-2xl font-bold">
                  {dialog.title}
                </h2>
                <p className="mb-5">{dialog.text}</p>
                <div className="flex items-center justify-end">
                  <button
                    className="button-outline"
                    onClick={e => {
                      setDialog(null);
                    }}
                  >
                    Vredu
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.getElementById('modal-root')
        )}
    </>
  );
}
