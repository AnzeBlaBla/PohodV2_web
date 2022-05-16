import { useEffect } from 'react';

import { request } from '../../utils/functions';

import HomeTemplate from './HomeTemplate';

function TeacherHome() {
  useEffect(() => {
    request('/events/37/tracking')
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <HomeTemplate
      title="Pohod V2 - Učitelj"
      text="Aplikacija za organizacijo in izvedbo orientacijskega pohoda."
    />
  );
}

export default TeacherHome;
