import React from 'react';
import { NavLink } from 'react-router-dom';

import { useGlobalContext } from '../context/GlobalContext';

import Card from '../components/UI/Card';

function NoPage() {
  const { loggedIn } = useGlobalContext();

  return (
    <div className="small-container mt-10">
      <Card>
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-center text-4xl font-bold my-5">404</h1>
          <p className="text-xl text-center mb-5">
            Stran, ki jo trenutno iščete ni na voljo.
          </p>
          <NavLink to={loggedIn ? '/' : '/login'} className="button">
            Pojdite nazaj
          </NavLink>
        </div>
      </Card>
    </div>
  );
}

export default NoPage;
