import { useEffect, useState } from 'react';

import { request } from '../../utils/functions';

import { useGlobalContext } from '../../context/GlobalContext';

import Card from '../UI/Card';

export default function ProfileInfo({ user }) {
  const { setShowLoadingSpinner, setDialog } = useGlobalContext();

  const userType =
    user.user_type === '2'
      ? 'Administrator'
      : user.user_type === '1'
      ? 'Učitelj'
      : 'Učenec';

  const [event, setEvent] = useState(null);

  useEffect(() => {
    if (user.group) {
      setShowLoadingSpinner(true);
      request(`/events/${user.group.event_id}`)
        .then(res => {
          setShowLoadingSpinner(false);
          setEvent(res);
        })
        .catch(err => {
          setShowLoadingSpinner(false);
          setDialog({
            title: 'Napaka pri pridobivanju dogodka',
            text: 'Prišlo je do napake pri pridobivanju dogodka. Poskusite znova.',
          });
        });
    }
  }, [user, setEvent, setShowLoadingSpinner, setDialog]);

  return (
    <>
      <div className="flex flex-col justify-center items-center mb-5">
        <h1 className="bg-blue-700 inline-block text-white text-4xl font-bold rounded-full p-12 prevent-invert">
          {user.first_name[0]}
          {user.last_name[0]}
        </h1>
        <h2 className="text-2xl font-bold mt-2 ">
          {user.first_name} {user.last_name}
        </h2>
        <p className="text-xl my-2">{userType}</p>
        <p>{user.email}</p>
      </div>
      <div className="flex flex-col justify-center">
        {user.group && (
          <Card>
            <h3>Pri skupini</h3>
            <p className="mt-3 font-bold text-xl">{user.group.name}</p>
          </Card>
        )}
        {user.group && event && (
          <Card>
            <h3>Pri dogodku</h3>
            <p className="mt-3 font-bold text-xl">{event.name}</p>
          </Card>
        )}

        {user.group && (
          <Card>
            <h3>Koda skupine</h3>
            <p className="mt-3 font-bold text-xl">{user.group.code}</p>
          </Card>
        )}
      </div>
    </>
  );
}
