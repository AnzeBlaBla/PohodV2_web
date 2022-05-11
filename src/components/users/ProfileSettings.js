import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useGlobalContext } from '../../context/GlobalContext';

export default function ProfileSettings({ user }) {
  const navigate = useNavigate();

  const { logout } = useGlobalContext();

  const logoutHandler = () => {
    navigate('/');
    logout();
  };

  return (
    <div className="mt-5">
      <button className="button w-full" onClick={logoutHandler}>
        Izpiši se
      </button>
    </div>
  );
}
