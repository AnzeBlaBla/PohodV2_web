import React from 'react';

function Input({ label, options, invalid, invalidLabel, onChange, value }) {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={options.id}
      >
        {label}
      </label>
      <input
        className={`shadow appearance-none border w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          invalid && 'border-red-500'
        }`}
        {...options}
        onChange={event => onChange(event)}
        value={value}
      />
      {invalid && <p className="text-red-500 text-xs italic">{invalidLabel}</p>}
    </div>
  );
}

export default Input;
