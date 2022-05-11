import React from 'react';

export default function ProfileInfo({ user }) {
  const userType =
    user.user_type === '2'
      ? 'Administrator'
      : user.user_type === '1'
      ? 'Učitelj'
      : 'Učenec';

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="bg-blue-700 inline-block text-white text-4xl font-bold rounded-full p-12 prevent-invert">
        {user.first_name[0]}
        {user.last_name[0]}
      </h1>
      <h2 className="text-2xl font-bold mt-2 ">
        {user.first_name} {user.last_name}
      </h2>
      <p className="text-xl my-2">{userType}</p>
      <p>{user.email}</p>
      <p></p>
    </div>
  );
}
