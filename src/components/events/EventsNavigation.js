import React from 'react';
import { NavLink } from 'react-router-dom';

function EventsNavigation() {
  const menuLinkStyles = ({ isActive = false }) =>
    isActive
      ? 'button-outline text-white bg-blue-700 mr-5'
      : 'button-outline mr-5';

  return (
    <div className="my-5 mt-10 flex  items-center">
      <NavLink to="/events/all" className={menuLinkStyles}>
        Vsi Dogodki
      </NavLink>
      <NavLink to="/events/new" className={menuLinkStyles}>
        Nov Dogodek
      </NavLink>
    </div>
  );
}

export default EventsNavigation;
