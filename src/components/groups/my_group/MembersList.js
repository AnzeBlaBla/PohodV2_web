import React from 'react';

import { useGlobalContext } from '../../../context/GlobalContext';

import { request } from '../../../utils/functions';

export default function MembersList({ user }) {
  const { setNotification, setShowLoadingSpinner } = useGlobalContext();

  const kickMemberHandler = ({ user_id, first_name, last_name } = {}) => {
    setShowLoadingSpinner(true);
    console.log(`/groups/${user.group.group_id}/kick/${user_id}`);
    request(`/groups/${user.group.group_id}/kick/${user_id}`, 'DELETE')
      .then(data => {
        console.log(data);

        setNotification({
          title: `Uporabnik ${first_name} ${last_name} je bil odstranjen!`,
          type: 'success',
        });
        setShowLoadingSpinner(false);
      })
      .catch(err => {
        setShowLoadingSpinner(false);
        console.log(err);
      });
  };

  return (
    <div className="my-5">
      <h2 className="text-xl font-bold mb-3">Člani skupine</h2>
      <div>
        {user.group.members.map(member => (
          <div
            key={member.user_id}
            className="border-2 p-4 flex justify-between items-center mb-1"
          >
            <span>
              {member.first_name} {member.last_name}
            </span>
            {member.user_id !== user.group.leader_id &&
              user.user_id === user.group.leader_id && (
                <button
                  className="button-danger button-small"
                  onClick={kickMemberHandler.bind(null, member)}
                >
                  Vrži iz skupine
                </button>
              )}
          </div>
        ))}
      </div>
    </div>
  );
}
