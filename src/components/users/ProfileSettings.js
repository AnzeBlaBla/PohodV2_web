import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useGlobalContext } from '../../context/GlobalContext';

export default function ProfileSettings({ user }) {
  const navigate = useNavigate();

  const { logout, toggleSchemeTheme } = useGlobalContext();

  const logoutHandler = () => {
    navigate('/');
    logout();
  };

  return (
    <div className="mt-5">
      <button className="button-outline w-full" onClick={toggleSchemeTheme}>
        Preklopi med temami
      </button>
      <hr className="my-5"></hr>
      <button className="button w-full" onClick={logoutHandler}>
        Izpiši se
      </button>
    </div>
  );
}
