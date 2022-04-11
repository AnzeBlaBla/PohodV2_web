import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { request } from '../../utils/functions';

import Card from '../../components/UI/Card';
import Input from '../../components/UI/Input';

function NewEvent() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [nameInvalid, setNameInvalid] = useState(false);

  const [date, setDate] = useState('');
  const [dateInvalid, setDateInvalid] = useState(false);

  const [minMembers, setMinMembers] = useState(4);
  const [minMembersInvalid, setMinMembersInvalid] = useState(false);

  const [maxMembers, setMaxMembers] = useState(6);
  const [maxMembersInvalid, setMaxMembersInvalid] = useState(false);

  const nameOnChangeHandler = event => {
    setName(event.target.value);
  };

  const dateOnChangeHandler = event => {
    setDate(event.target.value);
  };

  const minMembersOnChangeHandler = event => {
    setMinMembers(event.target.value);
  };

  const maxMembersOnChangeHandler = event => {
    setMaxMembers(event.target.value);
  };

  const formOnSubmitHandler = event => {
    event.preventDefault();

    setNameInvalid(false);
    setDateInvalid(false);
    setMinMembersInvalid(false);
    setMaxMembersInvalid(false);

    if (name.trim() === '') {
      setNameInvalid(true);
    }

    if (date === '') {
      setDateInvalid(true);
    }

    if (minMembers > maxMembers) {
      setMinMembersInvalid(true);
    }

    if (maxMembers < minMembers) {
      setMaxMembersInvalid(true);
    }

    if (
      name.trim() === '' ||
      date === '' ||
      minMembers > maxMembers ||
      maxMembers < minMembers
    ) {
      return;
    }

    request('/events', 'POST', {
      name,
      date,
      min_group_members: minMembers,
      max_groups_members: maxMembers,
    })
      .then(data => {
        navigate('/events/all', { replace: true });
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <Card>
      <form onSubmit={formOnSubmitHandler}>
        {/* Name */}
        <Input
          label="Ime dogodka"
          options={{
            id: 'name',
            type: 'text',
            placeholder: 'Vnesite ime dogodka',
          }}
          invalid={nameInvalid}
          onChange={nameOnChangeHandler}
          value={name}
        />
        {/* Date */}
        <Input
          label="Datum dogodka"
          options={{
            id: 'date',
            type: 'date',
            placeholder: 'Vnesite datum dogodka',
          }}
          invalid={dateInvalid}
          onChange={dateOnChangeHandler}
          value={date}
        />

        {/* Min Members */}
        <Input
          label="Najmanj članov v ekipi"
          options={{
            id: 'minMembers',
            type: 'number',
          }}
          invalid={minMembersInvalid}
          onChange={minMembersOnChangeHandler}
          value={minMembers}
        />

        {/* Max Members */}
        <Input
          label="Največ članov v ekipi"
          options={{
            id: 'maxMembers',
            type: 'number',
          }}
          invalid={maxMembersInvalid}
          onChange={maxMembersOnChangeHandler}
          value={maxMembers}
        />
        <div className="flex items-center justify-between">
          <button
            className="button focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Ustvari
          </button>
        </div>
      </form>
    </Card>
  );
}

export default NewEvent;
