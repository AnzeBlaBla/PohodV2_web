import { useState } from 'react';

import Card from '../UI/Card';
import Input from '../UI/Input';

function JoinGroupForm() {
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

    console.log(groupCode);
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
