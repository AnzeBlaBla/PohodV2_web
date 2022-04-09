import { useContext, createContext, useEffect, useState } from 'react';
import { request } from '../utils/functions';

const Context = createContext();
const { Provider } = Context;

function GlobalContextProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    request('/me')
      .then(data => {
        if (data) {
          setLoggedIn(true);
          setUser(data);
        } else {
          setLoggedIn(false);
          setUser(null);
        }
      })
      .catch(err => {
        setLoggedIn(false);
        setUser(null);
      });
  }, []);

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      request('/auth/login', 'POST', { email, password })
        .then(data => {
          if (data) {
            setLoggedIn(true);
            setUser(data);
          } else {
            setLoggedIn(false);
            setUser(null);
          }
          resolve(data);
        })
        .catch(err => {
          setLoggedIn(false);
          setUser(null);

          console.log('err while logging in', err);
          reject(err);
        });
    });
  };

  const logout = () => {
    return new Promise((resolve, reject) => {
      request('/auth/logout', 'POST')
        .then(data => {
          setLoggedIn(false);
          setUser(null);
          resolve(data);
        })
        .catch(err => {
          setLoggedIn(false);
          setUser(null);

          console.log('err while logging out', err.message);
          reject(err);
        });
    });
  };

  const value = {
    loggedIn,
    user,
    login,
    logout,
  };

  return <Provider value={value}>{children}</Provider>;
}

const useGlobalContext = () => useContext(Context);

export { GlobalContextProvider, useGlobalContext };
