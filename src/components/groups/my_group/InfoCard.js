import React from 'react';

import MembersList from './MembersList';

export default function InfoCard({ user }) {
  return (
    <div className="mt-5">
      <h2 className="p-3 bg-blue-700 text-white text-center text-2xl font-bold">
        {user.group.name}
      </h2>
      <div>
        <span className="block text-center text-xl my-3">
          Koda za vstop v skupino
        </span>
        <span className="block text-center text-4xl font-bold">
          {user.group.code}
        </span>
        <button className="button-success mx-auto block my-3">
          Kopiraj kodo
        </button>
      </div>
      <MembersList user={user} />
      <div className="flex justify-center items-center">
        <button className="button-warning mx-3">Regeneriraj kodo</button>
        <button className="button-danger">Zapusti skupino</button>
      </div>
    </div>
  );
}
