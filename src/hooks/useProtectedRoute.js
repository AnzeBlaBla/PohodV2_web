import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGlobalContext } from '../context/GlobalContext';

export default function useProtectedRoute(authRequired) {
  const navigate = useNavigate();
  const { loggedIn } = useGlobalContext();

  useEffect(() => {
    switch (authRequired) {
      case 'required':
        if (!loggedIn) {
          navigate('/login');
        }
        break;
      case 'notRequired':
        if (loggedIn) {
          navigate('/');
        }
        break;
      default:
        break;
    }
  }, [authRequired, loggedIn, navigate]);
}
