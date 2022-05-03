import { useEffect, useState } from 'react';

import { request } from '../../utils/functions';

import MyGroupAlert from '../../components/groups/my_group/MyGroupAlert';
import InfoCard from '../../components/groups/my_group/InfoCard';

function MyGroup({ user }) {
  const [minGroupMembers, setMinGroupMembers] = useState(null);
  const [maxGroupMembers, setMaxGroupMembers] = useState(null);

  useEffect(() => {
    request(`/events/${user.group.event_id}`)
      .then(data => {
        setMaxGroupMembers(+data.max_group_members);
        setMinGroupMembers(+data.min_group_members);
      })
      .catch(err => {
        console.log(err);
      });
  }, [user]);

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
