import React from 'react';

function LeaderboardItem({ group, index }) {
  return (
    <tr
      className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
      key={group.name}
    >
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {index + 1}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {group.name}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {group.time}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {group.correct_answers} / {group.possible_points}
      </td>
    </tr>
  );
}

export default LeaderboardItem;
