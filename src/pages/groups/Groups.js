import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import useProtectedRoute from '../../hooks/useProtectedRoute';

import NewGroup from './NewGroup';
import JoinGroup from './JoinGroup';
import MyGroup from './MyGroup';

import GroupsNavigation from '../../components/groups/GroupsNavigation';

import Container from '../../components/UI/Container';
import Card from '../../components/UI/Card';

function Groups({ user }) {
  useProtectedRoute('required');

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [labels, setLabels] = useState([
    'Moja Skupina',
    'Nova Skupina',
    'Pridruži Se',
  ]);
  const [links, setLinks] = useState([
    '/groups/my_group',
    '/groups/new',
    '/groups/join',
  ]);

  useEffect(() => {
    if (pathname === '/groups') {
      if (user.group) {
        setLabels(['Moja Skupina']);
        setLinks(['/groups/my_group']);

        navigate('/groups/my_group');
      } else {
        setLabels(['Nova Skupina', 'Pridruži Se']);
        setLinks(['/groups/new', '/groups/join']);

        navigate('/groups/join');
      }
    }
  }, [pathname, navigate, user]);

  return (
    <Container mode="page">
      <Card>
        <GroupsNavigation labels={labels} links={links} />
        <Routes>
          {!user.group && <Route path="new" element={<NewGroup />} />}
          {!user.group && <Route path="join" element={<JoinGroup />} />}
          {user.group && <Route path="my_group" element={<MyGroup />} />}
        </Routes>
      </Card>
    </Container>
  );
}

export default Groups;
