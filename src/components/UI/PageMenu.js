import React from 'react';
import { NavLink } from 'react-router-dom';

function PageMenu({ labels, links }) {
  const menuLinkStyles = ({ isActive = false }) =>
    isActive
      ? 'button-outline text-white bg-blue-700 mr-5 text-sm md:text-base'
      : 'button-outline mr-5 text-sm md:text-base';

  return (
    <div className="my-5 mt-10 flex  items-center">
      {links.map((link, index) => (
        <NavLink to={link} className={menuLinkStyles} key={index}>
          {labels[index]}
        </NavLink>
      ))}
    </div>
  );
}

export default PageMenu;
