import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useGlobalContext } from '../../../context/GlobalContext';

import { request } from '../../../utils/functions';

export default function MembersList({ user }) {
  const navigate = useNavigate();

  const { setNotification, setShowLoadingSpinner, setDialog } =
    useGlobalContext();

  const kickMemberHandler = ({ user_id, first_name, last_name } = {}) => {
    setShowLoadingSpinner(true);
    console.log(`/groups/kick/${user_id}`);
    request(`/groups/kick/${user_id}`, 'DELETE')
      .then(data => {
        setNotification({
          title: `Uporabnik ${first_name} ${last_name} je bil odstranjen!`,
          type: 'success',
        });

        navigate('/groups');

        setShowLoadingSpinner(false);
      })
      .catch(err => {
        setShowLoadingSpinner(false);
        setDialog({
          title: 'Napaka pri spreminjanju članov',
          text: 'Prišlo je do napake pri spreminjanju članov. Poskusite znova.',
        });
      });
  };

  return (
    <div className="my-5">
      <h2 className="text-xl font-bold mb-3">Člani skupine</h2>
      <div>
        {user.group.members.map(member => (
          <div
            key={member.user_id}
            className="p-4 flex justify-between items-center mb-3 shadow-md"
          >
            <span>
              {member.first_name} {member.last_name}
            </span>
            {member.user_id === user.group.leader_id && (
              <span className="bg-blue-700 text-white font-bold py-1 px-3 prevent-invert">
                Vodja
              </span>
            )}
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
