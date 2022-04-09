import { useEffect, useState } from 'react';

import useProtectedRoute from '../hooks/useProtectedRoute';

import { request } from '../utils/functions';
import { userTypes } from '../utils/consts';

import UserHome from '../components/home/UserHome';
import TeacherHome from '../components/home/TeacherHome';
import AdminHome from '../components/home/AdminHome';

function Home() {
  useProtectedRoute('required');

  const [user, setUser] = useState({});

  useEffect(() => {
    request('/me').then(data => {
      if (data) {
        setUser(data);
      }
    });
  }, []);

  return (
    <>
      {user.user_type === userTypes.ADMIN && <AdminHome />}
      {user.user_type === userTypes.TEACHER && <TeacherHome />}
      {user.user_type === userTypes.USER && <UserHome />}
    </>
  );
}

export default Home;
