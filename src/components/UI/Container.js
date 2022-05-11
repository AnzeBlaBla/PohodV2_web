import React from 'react';

function Container({ children, mode }) {
  return (
    <div
      className={`container ${mode === 'page' ? 'mt-10' : ''} apply-background`}
    >
      {children}
    </div>
  );
}

export default Container;
