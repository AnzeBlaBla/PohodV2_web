import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useGlobalContext } from '../../../context/GlobalContext';

import { request } from '../../../utils/functions';

import MembersList from './MembersList';

export default function InfoCard({ user }) {
  const navigate = useNavigate();

  const { setNotification, setShowLoadingSpinner, setDialog } =
    useGlobalContext();

  const copyCodeHandler = () => {
    setNotification({
      title: 'Koda, skupine je bila kopirana!',
      type: 'success',
    });

    const code = user.group.code;
    navigator.clipboard.writeText(code);
  };

  const leaveGroupHandler = () => {
    setShowLoadingSpinner(true);
    request('/groups/leave', 'POST')
      .then(data => {
        setShowLoadingSpinner(false);
        navigate('/groups/new');
      })
      .catch(err => {
        setShowLoadingSpinner(false);
        setDialog({
          title: 'Napaka pri zapuščanju skupine',
          text: 'Prišlo je do napake pri zapuščanju skupine. Poskusite znova.',
        });
      });
  };

  const regenerateCodeHandler = () => {
    setShowLoadingSpinner(true);
    request(`/groups/${user.group.group_id}/code`, 'PUT')
      .then(() => {
        setShowLoadingSpinner(false);

        navigate('/groups');

        setNotification({
          title: 'Koda, skupine je bila posodobljena!',
          type: 'success',
        });
      })
      .catch(err => {
        setShowLoadingSpinner(false);
        setDialog({
          title: 'Napaka pri regeneriranju kode',
          text: 'Prišlo je do napake pri regeneriranju kode. Poskusite znova.',
        });
      });
  };

  return (
    <div className="mt-5">
      <h2 className="p-3 bg-blue-700 text-white text-2xl font-bold text-center">
        {user.group.name}
      </h2>
      <div>
        <span className="block text-center text-xl my-3">
          Koda za vstop v skupino
        </span>
        <span className="block text-center text-4xl font-bold">
          {user.group.code}
        </span>
        <button
          className="button-success mx-auto block my-3"
          onClick={copyCodeHandler}
        >
          Kopiraj kodo
        </button>
      </div>
      <MembersList user={user} />
      <div className="flex justify-center items-center">
        {user.user_id === user.group.leader_id && (
          <button
            className="button-warning mx-3"
            onClick={regenerateCodeHandler}
          >
            Regeneriraj kodo
          </button>
        )}
        <button className="button-danger" onClick={leaveGroupHandler}>
          Zapusti skupino
        </button>
      </div>
    </div>
  );
}
