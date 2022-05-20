import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import GroupsNavigation from '../../components/groups/GroupsNavigation';

import Container from '../../components/UI/Container';
import Card from '../../components/UI/Card';

const NewGroup = React.lazy(() => import('./NewGroup'));
const JoinGroup = React.lazy(() => import('./JoinGroup'));
const MyGroup = React.lazy(() => import('./MyGroup'));

function Groups({ user }) {
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
    if (user.group) {
      setLabels(['Moja Skupina']);
      setLinks(['/groups/my_group']);
    } else {
      setLabels(['Nova Skupina', 'Pridruži Se']);
      setLinks(['/groups/new', '/groups/join']);
    }

    if (pathname === '/groups') {
      if (user.group) {
        navigate('/groups/my_group');
      } else {
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
          {user.group && (
            <Route path="my_group" element={<MyGroup user={user} />} />
          )}
        </Routes>
      </Card>
    </Container>
  );
}

export default Groups;
