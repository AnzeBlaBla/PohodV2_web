import React from 'react';
import { NavLink } from 'react-router-dom';

function MobileNavbarMenu({
  loggedIn,
  logoutHandler,
  menuNavbarLinkStyles,
  user,
  userTypes,
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
      {!loggedIn && (
        <li>
          <NavLink to="/login" className={menuNavbarLinkStyles}>
            Prijavi se
          </NavLink>
        </li>
      )}

      <li>
        {loggedIn && (
          <NavLink to="/leaderboard" className={menuNavbarLinkStyles}>
            Rezultati
          </NavLink>
        )}
      </li>

      {loggedIn && (
        <li>
          <a
            href="/#!"
            className="block text-sm px-2 py-4 hover:bg-blue-700 hover:text-white transition duration-300"
            onClick={logoutHandler}
          >
            Odjavi se
          </a>
        </li>
      )}
    </ul>
  );
}

export default MobileNavbarMenu;
