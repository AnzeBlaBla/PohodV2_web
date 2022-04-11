import React from 'react';

import PageMenu from '../UI/PageMenu';

function EventsNavigation() {
  const labels = ['Vsi Dogodki', 'Nov Dogodek'];
  const links = ['/events/all', '/events/new'];

  return <PageMenu labels={labels} links={links} />;
}

export default EventsNavigation;
