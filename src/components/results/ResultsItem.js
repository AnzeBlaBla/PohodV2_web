import React from 'react';

function ResultsItem({ result, index }) {
  return (
    <tr
      className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
      key={result.point.name}
    >
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {index + 1}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {result.point.name}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {result.correct_answers} / {result.all_answers}
      </td>
    </tr>
  );
}

export default ResultsItem;
