import React from 'react';

import { useGlobalContext } from '../../../context/GlobalContext';

import Logo from '../../../logo.jpg';

function NavbarLogo() {
  const { toggleSchemeTheme } = useGlobalContext();

  return (
    <a
      href="#!"
      className="flex items-center py-4 px-2"
      onClick={toggleSchemeTheme}
    >
      <img src={Logo} alt="Logo" className="h-8 w-8 mr-2 prevent-invert" />
      <span className="font-semibold text-gray-500 text-lg">Pohod V2</span>
    </a>
  );
}

export default NavbarLogo;
