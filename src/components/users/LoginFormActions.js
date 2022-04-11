import React from 'react';

function LoginFormActions() {
  return (
    <div className="flex items-center justify-between">
      <button
        className="button focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Prijavite se
      </button>
      <a
        className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
        href="https://malice.scv.si/students/password/new"
        target="_blank"
        rel="noopener noreferrer"
      >
        Pozabljeno geslo?
      </a>
    </div>
  );
}

export default LoginFormActions;
