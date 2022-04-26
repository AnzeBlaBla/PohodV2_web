import React from 'react';

function SelectEvent({ events, selectedEvent, eventOnChangeHandler }) {
  return (
    <div className="flex justify-center">
      <div className="mb-3 w-full">
        <select
          className="select focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          onChange={eventOnChangeHandler}
          value={selectedEvent}
        >
          <option value={''}>Izberite dogodek</option>
          {events.map(event => (
            <option key={event.event_id} value={event.event_id}>
              {event.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default SelectEvent;
