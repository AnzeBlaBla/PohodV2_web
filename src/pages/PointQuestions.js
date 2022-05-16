import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { request } from '../utils/functions';

export default function PointQuestions() {
  const { hash } = useParams();

  useEffect(() => {
    request(`/point_questions/${hash}`)
      .then(data => {
        console.log('number of questions', data);
        return request(`/questions/${hash}`);
      })
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [hash]);

  return <div>PointQuestions</div>;
}
