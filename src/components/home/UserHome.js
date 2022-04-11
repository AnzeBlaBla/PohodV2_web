import { useEffect, useState } from 'react';

import { useGlobalContext } from '../../context/GlobalContext';

import { request } from '../../utils/functions';

import Map from '../UI/Map';

function UserHome() {
  const { user } = useGlobalContext();

  const [points, setPoints] = useState([]);

  useEffect(() => {
    if (user.group) {
      request('points/unlocked').then(
        res => {
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
    }
  }, [user]);

  return <Map points={points} />;
}

export default UserHome;
