import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGlobalContext } from '../../context/GlobalContext';

import { request } from '../../utils/functions';

import Card from '../UI/Card';
import Input from '../UI/Input';

function EventsForm({ data = {}, method = 'POST', show = true } = {}) {
  const navigate = useNavigate();

  const { setShowLoadingSpinner, setNotification, setDialog } =
    useGlobalContext();

  const [name, setName] = useState(data.name || '');
  const [nameInvalid, setNameInvalid] = useState(false);

  const [date, setDate] = useState(data.date || '');
  const [dateInvalid, setDateInvalid] = useState(false);

  const [minMembers, setMinMembers] = useState(data.min_group_members || 4);
  const [minMembersInvalid, setMinMembersInvalid] = useState(false);

  const [maxMembers, setMaxMembers] = useState(data.max_group_members || 6);
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

    setShowLoadingSpinner(true);
    request(`/events${method === 'PUT' ? `/${data.event_id}` : ''}`, method, {
      name,
      date,
      min_group_members: minMembers,
      max_group_members: maxMembers,
    })
      .then(data => {
        setShowLoadingSpinner(false);
        setNotification({
          type: 'success',
          title: `Dogodek ${
            method === 'PUT' ? 'posodobljen' : 'ustvarjen'
          } uspešno!`,
        });

        navigate('/events/all', {
          replace: true,
        });
      })
      .catch(err => {
        setShowLoadingSpinner(false);
        setDialog({
          title: 'Napaka pri ustvarjanju ali posodabljanju dogodka',
          text: 'Prišlo je do napake pri ustvarjanju ali posodabljanju. Poskusite znova.',
        });
      });
  };

  return (
    <>
      {show && (
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
              invalidLabel={'Prosimo vnesite ime dogodka.'}
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
              invalidLabel={'Prosimo vnesite datum dogodka.'}
              onChange={dateOnChangeHandler}
              value={date}
            />
            {/* Min Members */}
            <Input
              label="Najmanj članov v ekipi"
              options={{
                id: 'minMembers',
                type: 'number',
                min: 1,
              }}
              invalid={minMembersInvalid}
              invalidLabel={'Prosimo vnesite najmanj članov v ekipi.'}
              onChange={minMembersOnChangeHandler}
              value={minMembers}
            />
            {/* Max Members */}
            <Input
              label="Največ članov v ekipi"
              options={{
                id: 'maxMembers',
                type: 'number',
                min: 1,
              }}
              invalid={maxMembersInvalid}
              invalidLabel={'Prosimo vnesite največ članov v ekipi.'}
              onChange={maxMembersOnChangeHandler}
              value={maxMembers}
            />
            <div className="flex items-center justify-between">
              <button
                className="button focus:outline-none focus:shadow-outline"
                type="submit"
              >
                {method === 'POST' ? 'Ustvari' : 'Posodobi'}
              </button>
            </div>
          </form>
        </Card>
      )}
    </>
  );
}

export default EventsForm;
