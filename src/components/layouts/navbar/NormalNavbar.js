import React from 'react';
import { NavLink } from 'react-router-dom';

function NormalNavbar({ loggedIn, navbarNavLinkStyles, user, userTypes }) {
  return (
    <div className="hidden md:flex items-center space-x-1">
      {loggedIn && (
        <NavLink to="/" className={navbarNavLinkStyles}>
          Domov
        </NavLink>
      )}
      {loggedIn &&
        user.user_type === userTypes.ADMIN &&
        Object.keys(user).length > 0 && (
          <NavLink to="/events" className={navbarNavLinkStyles}>
            Dogodki
          </NavLink>
        )}
      {!loggedIn && (
        <NavLink to="/login" className={navbarNavLinkStyles}>
          Prijavi se
        </NavLink>
      )}
      {loggedIn && (
        <NavLink to="/leaderboard" className={navbarNavLinkStyles}>
          Rezultati
        </NavLink>
      )}
    </div>
  );
}

export default NormalNavbar;
