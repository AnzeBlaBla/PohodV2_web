import React from 'react';

function Container({ children, mode }) {
  return (
    <div className={`container ${mode === 'page' ? 'mt-10' : ''}`}>
      {children}
    </div>
  );
}

export default Container;
