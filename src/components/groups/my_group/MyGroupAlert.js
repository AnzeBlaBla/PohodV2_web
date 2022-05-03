import React from 'react';

import Alert from '../../UI/Alert';

export default function MyGroupAlert({
  user,
  minGroupMembers,
  maxGroupMembers,
}) {
  const title = `${
    user.group.members.length > maxGroupMembers ? 'Preveč' : 'Premalo'
  } članov v skupini!`;

  return (
    <>
      {minGroupMembers &&
        maxGroupMembers &&
        (user.group.members.length < minGroupMembers ||
          user.group.members.length > maxGroupMembers) && (
          <Alert title={title} type="error">
            <small>
              Skupina vsebuje{' '}
              {user.group.members.length > maxGroupMembers
                ? 'preveč'
                : 'premalo'}{' '}
              članov v skupini ({user.group.members.length}), kar pomeni, da se
              dogodka ne bo smela udeležiti.<br></br>
              Najmanjše število članov v ekipi za ta dogodek: {minGroupMembers}
              <br></br>
              Največje število članov v ekipi za ta dogodek: {maxGroupMembers}.
            </small>
          </Alert>
        )}
    </>
  );
}
