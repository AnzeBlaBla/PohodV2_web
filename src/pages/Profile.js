import React from 'react';

import ProfileInfo from '../components/users/ProfileInfo';
import ProfileSettings from '../components/users/ProfileSettings';

import Container from '../components/UI/Container';
import Card from '../components/UI/Card';

function Profile({ user }) {
  return (
    <Container mode="page">
      <Card>
        <ProfileInfo user={user} />
        <ProfileSettings user={user} />
      </Card>
    </Container>
  );
}

export default Profile;
