import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { request } from '../../utils/functions';

import Card from '../UI/Card';
import Input from '../UI/Input';

function JoinGroupForm() {
  const navigate = useNavigate();

  const [groupCode, setGroupCode] = useState('');
  const [groupCodeInvalid, setGroupCodeInvalid] = useState(false);

  const groupCodeOnChangeHandler = event => {
    setGroupCode(event.target.value);
  };

  const formOnSubmitHandler = event => {
    event.preventDefault();

    setGroupCodeInvalid(false);

    if (groupCode.trim() === '') {
      setGroupCodeInvalid(true);
      return;
    }

    request(`/groups/${groupCode}`, 'PUT')
      .then(() => {
        navigate('/groups/my_group', { replace: true });
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <Card>
      <form onSubmit={formOnSubmitHandler}>
        {/* Name */}
        <Input
          label="Koda Skupine"
          options={{
            id: 'code',
            type: 'text',
            placeholder: 'Vnesite kodo skupine',
          }}
          invalid={groupCodeInvalid}
          invalidLabel={'Prosimo vnesite kodo skupine.'}
          onChange={groupCodeOnChangeHandler}
          value={groupCode}
        />
        <div className="flex items-center justify-between">
          <button
            className="button focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Pridruži se
          </button>
        </div>
      </form>
    </Card>
  );
}

export default JoinGroupForm;
