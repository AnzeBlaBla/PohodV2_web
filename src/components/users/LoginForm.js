import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGlobalContext } from '../../context/GlobalContext';

import Card from '../UI/Card';
import Alert from '../UI/Alert';

function LoginForm() {
  const navigate = useNavigate();
  const { login } = useGlobalContext();

  const copyRightText = `${new Date().getFullYear()} ERŠ Velenje. All rights reserved.`;

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [usernameInvalid, setUsernameInvalid] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);

  const usernameOnChangeHandler = event => {
    setUserName(event.target.value);
  };

  const passwordOnChangeHandler = event => {
    setPassword(event.target.value);
  };

  const formOnSubmitHandler = event => {
    event.preventDefault();

    if (username.trim() === '' || password.trim() === '') {
      setUsernameInvalid(username.trim() === '');
      setPasswordInvalid(password.trim() === '');
      return;
    }

    login(username, password)
      .then(res => {
        // navigate('/', { replace: true });
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <Card>
        <Alert
          title="Info"
          text="Za vpis uporabite elektronski naslov in geslo, ki
            ga uporabljate pri vpisu v spletno aplikacijo za naročanje malic"
          type="info"
        />
        <form onSubmit={formOnSubmitHandler}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Uporabniško ime / Elektronski naslov
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                usernameInvalid && 'border-red-500'
              }`}
              id="username"
              type="text"
              placeholder="Vnesite uporabniško ime / elektronski naslov"
              onChange={usernameOnChangeHandler}
              value={username}
            />
            {usernameInvalid && (
              <p className="text-red-500 text-xs italic">
                Prosimo vnesite uporabniško ime / elektronski naslov.
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Geslo
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
                passwordInvalid && 'border-red-500'
              }`}
              id="password"
              type="password"
              placeholder="Vnesite geslo"
              onChange={passwordOnChangeHandler}
              value={password}
            />
            {passwordInvalid && (
              <p className="text-red-500 text-xs italic">
                Prosimo vnesite geslo.
              </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Prijavite se
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="https://malice.scv.si/students/password/new"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pozabljeno geslo?
            </a>
          </div>
        </form>
      </Card>
      <p className="text-center text-gray-500 text-xs">&copy;{copyRightText}</p>
    </div>
  );
}

export default LoginForm;
