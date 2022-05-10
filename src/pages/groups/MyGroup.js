import { useEffect, useState } from 'react';

import { useGlobalContext } from '../../context/GlobalContext';

import { request } from '../../utils/functions';

import MyGroupAlert from '../../components/groups/my_group/MyGroupAlert';
import InfoCard from '../../components/groups/my_group/InfoCard';

function MyGroup({ user }) {
  const { setShowLoadingSpinner } = useGlobalContext();

  const [minGroupMembers, setMinGroupMembers] = useState(null);
  const [maxGroupMembers, setMaxGroupMembers] = useState(null);

  useEffect(() => {
    setShowLoadingSpinner(true);
    request(`/events/${user.group.event_id}`)
      .then(data => {
        setShowLoadingSpinner(false);

        setMaxGroupMembers(+data.max_group_members);
        setMinGroupMembers(+data.min_group_members);
      })
      .catch(err => {
        setShowLoadingSpinner(false);
        console.log(err);
      });
  }, [user, setShowLoadingSpinner]);

  return (
    <>
      <MyGroupAlert
        user={user}
        maxGroupMembers={maxGroupMembers}
        minGroupMembers={minGroupMembers}
      />
      <InfoCard user={user} />
    </>
  );
}

export default MyGroup;
