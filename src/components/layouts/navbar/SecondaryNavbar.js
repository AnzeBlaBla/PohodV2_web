import React from 'react';
import { NavLink } from 'react-router-dom';

function SecondaryNavbar({ loggedIn, logoutHandler }) {
  return (
    <div className="hidden md:flex items-center space-x-3 ">
      {loggedIn && (
        <NavLink
          to="/profile"
          className="py-2 px-2 font-medium text-white bg-blue-700 hover:bg-blue-600 transition duration-300 prevent-invert"
        >
          Moj Profil
        </NavLink>
      )}
    </div>
  );
}

export default SecondaryNavbar;
