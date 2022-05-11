import React from 'react';

function SecondaryNavbar({ loggedIn, logoutHandler }) {
  return (
    <div className="hidden md:flex items-center space-x-3 ">
      {loggedIn && (
        <a
          href="#!"
          className="py-2 px-2 font-medium text-white bg-blue-700 rounded hover:bg-blue-600 transition duration-300 prevent-invert"
          onClick={logoutHandler}
        >
          Izpiši se
        </a>
      )}
    </div>
  );
}

export default SecondaryNavbar;
