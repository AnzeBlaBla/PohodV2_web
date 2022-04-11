import { useState } from 'react';

import { useGlobalContext } from '../../context/GlobalContext';

import Card from '../UI/Card';
import Alert from '../UI/Alert';
import Input from '../UI/Input';

import LoginFormActions from './LoginFormActions';

function LoginForm() {
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

    setUsernameInvalid(false);
    setPasswordInvalid(false);

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
    <div className="small-container">
      <Card>
        <Alert
          title="Info"
          text="Za vpis uporabite elektronski naslov in geslo, ki
            ga uporabljate pri vpisu v spletno aplikacijo za naročanje malic"
          type="info"
        />
        <form onSubmit={formOnSubmitHandler}>
          <Input
            label="Uporabniško ime / Elektronski naslov"
            options={{
              id: 'username',
              type: 'text',
              placeholder: 'Vnesite uporabniško ime / elektronski naslov',
            }}
            invalid={usernameInvalid}
            onChange={usernameOnChangeHandler}
            value={username}
          />
          <Input
            label="Geslo"
            options={{
              id: 'password',
              type: 'password',
              placeholder: 'Vnesite geslo',
            }}
            invalid={passwordInvalid}
            onChange={passwordOnChangeHandler}
            value={password}
          />
          <LoginFormActions />
        </form>
      </Card>
      <p className="text-center text-gray-500 text-xs">&copy;{copyRightText}</p>
    </div>
  );
}

export default LoginForm;
