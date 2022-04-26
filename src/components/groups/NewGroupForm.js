import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { request } from '../../utils/functions';

import Card from '../UI/Card';
import Input from '../UI/Input';

import SelectEvent from '../leaderboard/SelectEvent';

function NewGroupForm() {
  const navigate = useNavigate();

  const [groupName, setGroupName] = useState('');
  const [groupNameInvalid, setGroupNameInvalid] = useState(false);

  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');

  const groupNameOnChangeHandler = event => {
    setGroupName(event.target.value);
  };

  const eventOnChangeHandler = event => {
    setSelectedEvent(event.target.value);
  };

  const formOnSubmitHandler = event => {
    event.preventDefault();

    setGroupNameInvalid(false);

    if (groupName.trim() === '') {
      setGroupNameInvalid(true);
      return;
    }

    if (selectedEvent.trim() === '') {
      return;
    }

    request('/groups', 'POST', { name: groupName, event_id: selectedEvent })
      .then(data => {
        navigate('/groups/my_group', { replace: true });
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    request('/events')
      .then(data => {
        setEvents(data);
      })
      .catch(err => {
        console.log('Error fetching events', err);
      });
  }, []);

  return (
    <Card>
      <form onSubmit={formOnSubmitHandler}>
        {/* Name */}
        <Input
          label="Ime Skupine"
          options={{
            id: 'code',
            type: 'text',
            placeholder: 'Vnesite ime skupine',
          }}
          invalid={groupNameInvalid}
          invalidLabel={'Prosimo vnesite ime skupine.'}
          onChange={groupNameOnChangeHandler}
          value={groupName}
        />
        <SelectEvent
          events={events}
          selectedEvent={selectedEvent}
          eventOnChangeHandler={eventOnChangeHandler}
        />
        <div className="flex items-center justify-between mt-3">
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

export default NewGroupForm;
