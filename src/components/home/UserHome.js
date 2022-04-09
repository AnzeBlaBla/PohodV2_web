import { useEffect, useState } from 'react';

import { request } from '../../utils/functions';

import Map from '../UI/Map';

function UserHome() {
  const [points, setPoints] = useState([]);

  useEffect(() => {
    request('points/unlocked').then(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }, []);

  return (
    <div className="leaflet-container">
      <Map points={points} />
    </div>
  );
}

export default UserHome;
