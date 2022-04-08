import React from 'react';

import Card from '../UI/Card';

function LoginForm() {
  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <form>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Uporabniško ime
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Vnesite uporabniško ime"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Geslo
            </label>
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Vnesite geslo"
            />
            <p className="text-red-500 text-xs italic">
              Prosimo vnesite geslo.
            </p>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
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
        </form>
      </Card>
      <p className="text-center text-gray-500 text-xs">
        &copy;{new Date().getFullYear() + ' ERŠ Velenje. '} All rights reserved.
      </p>
    </div>
  );
}

export default LoginForm;
