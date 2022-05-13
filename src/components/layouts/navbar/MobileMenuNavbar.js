import React from 'react';
import { NavLink } from 'react-router-dom';

import { userTypes } from '../../../utils/consts';

function MobileNavbarMenu({
  loggedIn,
  logoutHandler,
  menuNavbarLinkStyles,
  user,
}) {
  return (
    <ul className="">
      {loggedIn && (
        <li>
          <NavLink to="/" className={menuNavbarLinkStyles}>
            Domov
          </NavLink>
        </li>
      )}
      {loggedIn &&
        user.user_type === userTypes.ADMIN &&
        Object.keys(user).length > 0 && (
          <li>
            <NavLink to="/events" className={menuNavbarLinkStyles}>
              Dogodki
            </NavLink>
          </li>
        )}
      {loggedIn &&
        user.user_type === userTypes.USER &&
        Object.keys(user).length > 0 && (
          <li>
            <NavLink to="/groups" className={menuNavbarLinkStyles}>
              Skupine
            </NavLink>
          </li>
        )}
      {loggedIn &&
        user.user_type === userTypes.USER &&
        Object.keys(user).length > 0 &&
        user.group && (
          <li>
            <NavLink to="/results" className={menuNavbarLinkStyles}>
              Moji odgovori
            </NavLink>
          </li>
        )}
      {loggedIn && (
        <li>
          <NavLink to="/leaderboard" className={menuNavbarLinkStyles}>
            Rezultati
          </NavLink>
        </li>
      )}
      {!loggedIn && (
        <li>
          <NavLink to="/login" className={menuNavbarLinkStyles}>
            Prijavi se
          </NavLink>
        </li>
      )}
      {loggedIn && (
        <li>
          <NavLink to="/profile" className={menuNavbarLinkStyles}>
            Moj Profil
          </NavLink>
        </li>
      )}
    </ul>
  );
}

export default MobileNavbarMenu;
