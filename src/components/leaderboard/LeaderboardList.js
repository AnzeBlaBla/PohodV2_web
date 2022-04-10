import React from 'react';

import LeaderboardItem from './LeaderboardItem';

function LeaderboardList({ groups }) {
  return (
    <>
      {groups.map((group, index) => (
        <LeaderboardItem group={group} index={index} key={group.group_id} />
      ))}
    </>
  );
}

export default LeaderboardList;
