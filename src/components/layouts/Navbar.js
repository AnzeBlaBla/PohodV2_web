import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGlobalContext } from '../../context/GlobalContext';

import MobileMenuNavbar from './navbar/MobileMenuNavbar';
import NormalNavbar from './navbar/NormalNavbar';
import SecondaryNavbar from './navbar/SecondaryNavbar';
import NavbarLogo from './navbar/NavbarLogo';
import HamburgerIcon from './navbar/HamburgerIcon';

function Navbar({ user }) {
  const navigate = useNavigate();

  const { loggedIn, logout } = useGlobalContext();

  const [menuHidden, setMenuHidden] = useState(true);

  const logoutHandler = () => {
    navigate('/');

    setMenuHidden(true);
    logout();
  };

  const mobileMenuButtonClickHandler = () => {
    setMenuHidden(!menuHidden);
  };

  const navbarNavLinkStyles = ({ isActive = false } = {}) => {
    return isActive
      ? 'py-4 px-2 text-blue-700 border-b-4 border-blue-700 font-semibold'
      : 'py-4 px-2 text-gray-500 font-semibold hover:text-blue-700 transition duration-300';
  };

  const menuNavbarLinkStyles = ({ isActive = false } = {}) => {
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
              <NavbarLogo />
            </div>
            {/* Primary Navbar Items */}
            <NormalNavbar
              loggedIn={loggedIn}
              navbarNavLinkStyles={navbarNavLinkStyles}
              user={user}
            />
          </div>
          {/* Secondary Navbar Items */}
          <SecondaryNavbar loggedIn={loggedIn} logoutHandler={logoutHandler} />
          {/* Mobile Menu Button */}
          <HamburgerIcon
            mobileMenuButtonClickHandler={mobileMenuButtonClickHandler}
          />
        </div>
      </div>
      {/* Mobile Menu */}
      <div className={`mobile-menu md:hidden ${menuHidden ? 'hidden' : ''}`}>
        <MobileMenuNavbar
          loggedIn={loggedIn}
          logoutHandler={logoutHandler}
          menuNavbarLinkStyles={menuNavbarLinkStyles}
          user={user}
        />
      </div>
    </nav>
  );
}

export default Navbar;
