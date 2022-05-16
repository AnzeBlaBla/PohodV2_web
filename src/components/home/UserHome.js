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

          const uniquePoints = res.filter(
            (point, index) =>
              res.findIndex(
                p =>
                  p.point_id === point.point_id && p.group_id === point.group_id
              ) === index
          );

          setPoints(uniquePoints);
        })
        .catch(err => {
          setShowLoadingSpinner(false);
        });
    }
  }, [user.group, setShowLoadingSpinner, setDialog]);

  return <Map points={points} />;
}

export default UserHome;
