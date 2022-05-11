import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGlobalContext } from '../../context/GlobalContext';

import { request } from '../../utils/functions';

import Card from '../UI/Card';
import Input from '../UI/Input';

import SelectEvent from '../leaderboard/SelectEvent';

function NewGroupForm() {
  const navigate = useNavigate();

  const { setShowLoadingSpinner, setDialog } = useGlobalContext();

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

    setShowLoadingSpinner(true);
    request('/groups', 'POST', { name: groupName, event_id: selectedEvent })
      .then(data => {
        setShowLoadingSpinner(false);
        navigate('/groups/my_group', { replace: true });
      })
      .catch(err => {
        setShowLoadingSpinner(false);
        setDialog({
          title: 'Napaka pri ustvarjanju skupine',
          text: 'Prišlo je do napake pri ustvarjanju skupine. Poskusite znova.',
        });
      });
  };

  useEffect(() => {
    setShowLoadingSpinner(true);
    request('/events')
      .then(data => {
        setShowLoadingSpinner(false);
        setEvents(data);
      })
      .catch(err => {
        setShowLoadingSpinner(false);
        setDialog({
          title: 'Napaka pri pridobivanju dogodkov',
          text: 'Prišlo je do napake pri pridobivanju dogodkov. Poskusite znova.',
        });
      });
  }, [setShowLoadingSpinner, setDialog]);

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
