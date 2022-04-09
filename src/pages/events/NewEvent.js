import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { request } from '../../utils/functions';

import Card from '../../components/UI/Card';

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
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Ime
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline `}
            id="name"
            type="text"
            placeholder="Vnesite ime dogodka"
            value={name}
            onChange={nameOnChangeHandler}
          />
          {nameInvalid && (
            <p className="text-red-500 text-xs italic">
              Prosimo vnesite ime dogodka.
            </p>
          )}
        </div>
        {/* Date */}
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="date"
          >
            Datum
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
            id="date"
            type="date"
            value={date}
            onChange={dateOnChangeHandler}
          />
          {dateInvalid && (
            <p className="text-red-500 text-xs italic">
              Prosimo izberite datum dogodka.
            </p>
          )}
        </div>
        {/* Min Members */}
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="minMembers"
          >
            Najmanj članov v ekipi
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
            id="minMembers"
            type="number"
            min="1"
            value={minMembers}
            onChange={minMembersOnChangeHandler}
          />
          {minMembersInvalid && (
            <p className="text-red-500 text-xs italic">
              Prosimo izberite pravilno število "najmanj članov v ekipi".
            </p>
          )}
        </div>
        {/* Max Members */}
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="maxMembers"
          >
            Največ članov v ekipi
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
            id="maxMembers"
            type="Number"
            min="1"
            value={maxMembers}
            onChange={maxMembersOnChangeHandler}
          />
          {maxMembersInvalid && (
            <p className="text-red-500 text-xs italic">
              Prosimo izberite pravilno število "največ članov v ekipi".
            </p>
          )}
        </div>
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
