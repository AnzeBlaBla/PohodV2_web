import { useEffect, useState } from 'react';

import { useGlobalContext } from '../../context/GlobalContext';

import { request } from '../../utils/functions';

import Map from '../UI/Map';

function UserHome({ user }) {
  const { setShowLoadingSpinner, setDialog } = useGlobalContext();

  const [points, setPoints] = useState([]);

  useEffect(() => {
    if (user.group) {
      setShowLoadingSpinner(true);
      request('/points/unlocked')
        .then(res => {
          setShowLoadingSpinner(false);
          setPoints(res);
        })
        .catch(err => {
          setShowLoadingSpinner(false);
          setDialog({
            title: 'Napaka pri pridobivanju točk',
            text: 'Prišlo je do napake pri pridobivanju točk. Poskusite znova.',
          });
        });
    }
  }, [user.group, setShowLoadingSpinner, setDialog]);

  return <Map points={points} />;
}

export default UserHome;
