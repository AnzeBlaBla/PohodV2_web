import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import Logo from '../../logo.jpg';

import { routes } from '../router/config';

function Navbar() {
  const [menuHidden, setMenuHidden] = useState(true);

  const mobileMenuButtonClickHandler = () => {
    setMenuHidden(!menuHidden);
  };

  const navbarNavLinkStyles = ({ isActive }) => {
    return isActive
      ? 'py-4 px-2 text-blue-700 border-b-4 border-blue-700 font-semibold'
      : 'py-4 px-2 text-gray-500 font-semibold hover:text-blue-700 transition duration-300';
  };

  const menuNavbarLinkStyles = ({ isActive }) => {
    return isActive
      ? 'block text-sm px-2 py-4 text-white bg-blue-700 font-semibold'
      : 'block text-sm px-2 py-4 hover:bg-blue-700 hover:text-white transition duration-300';
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              {/* Website Logo */}
              <a href="#!" className="flex items-center py-4 px-2">
                <img src={Logo} alt="Logo" className="h-8 w-8 mr-2" />
                <span className="font-semibold text-gray-500 text-lg">
                  Pohod V2
                </span>
              </a>
            </div>
            {/* Primary Navbar Items */}
            <div className="hidden md:flex items-center space-x-1">
              {routes.map(route => (
                <NavLink
                  key={route.path}
                  to={route.path}
                  className={navbarNavLinkStyles}
                >
                  {route.label}
                </NavLink>
              ))}
            </div>
          </div>
          {/* Secondary Navbar Items */}
          {/* <div className="hidden md:flex items-center space-x-3 ">
            <a
              href="#!"
              className="py-2 px-2 font-medium text-white bg-blue-700 rounded hover:bg-blue-600 transition duration-300"
            >
              Prijavi se
            </a>
          </div> */}
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              className="outline-none mobile-menu-button"
              onClick={mobileMenuButtonClickHandler}
            >
              <svg
                className=" w-6 h-6 text-gray-500 hover:text-blue-700 "
                x-show="!showMenu"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className={`mobile-menu md:hidden ${menuHidden ? 'hidden' : ''}`}>
        <ul className="">
          {routes.map(route => (
            <li>
              <NavLink
                key={route.path}
                to={route.path}
                className={menuNavbarLinkStyles}
              >
                {route.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
