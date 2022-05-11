import React from 'react';

import Logo from '../../../logo.jpg';

function NavbarLogo() {
  return (
    <a href="#!" className="flex items-center py-4 px-2">
      <img src={Logo} alt="Logo" className="h-8 w-8 mr-2 prevent-invert" />
      <span className="font-semibold text-gray-500 text-lg">Pohod V2</span>
    </a>
  );
}

export default NavbarLogo;
