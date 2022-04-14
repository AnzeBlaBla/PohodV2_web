import React from 'react';
import { NavLink } from 'react-router-dom';

import { userTypes } from '../../../utils/consts';

function NormalNavbar({ loggedIn, navbarNavLinkStyles, user }) {
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
      {loggedIn && (
        <NavLink to="/groups" className={navbarNavLinkStyles}>
          Skupine
        </NavLink>
      )}
      {loggedIn && (
        <NavLink to="/leaderboard" className={navbarNavLinkStyles}>
          Rezultati
        </NavLink>
      )}
      {!loggedIn && (
        <NavLink to="/login" className={navbarNavLinkStyles}>
          Prijavi se
        </NavLink>
      )}
    </div>
  );
}

export default NormalNavbar;
