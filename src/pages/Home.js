import React from 'react';

import useProtectedRoute from '../hooks/useProtectedRoute';

import { userTypes } from '../utils/consts';

const UserHome = React.lazy(() => import('../components/home/UserHome'));
const TeacherHome = React.lazy(() => import('../components/home/TeacherHome'));
const AdminHome = React.lazy(() => import('../components/home/AdminHome'));

function Home({ user }) {
  useProtectedRoute('required');

  return (
    <>
      {user.user_type === userTypes.ADMIN && <AdminHome />}
      {user.user_type === userTypes.TEACHER && <TeacherHome />}
      {user.user_type === userTypes.USER && <UserHome user={user} />}
    </>
  );
}

export default Home;
