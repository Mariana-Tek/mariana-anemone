import React from "react";
import { format } from "date-fns";


function ClassSession({ session }) {
  const dateObj = new Date(session.start_datetime);
  const date = format(dateObj, 'LLL do');
  const time = format(dateObj, 'h:mm aaaa');

  return (
    <li className='class-session'>
      <div className='class-session__info'>
        {session.class_type_display}
      </div>

      <div className='class-session__date'>
        {date} at {time}
      </div>

      <button
        onClick={() => window.xprops.actions.goToClass(session.id)}
        className='class-session__button button button--primary'
      >
        View
      </button>
    </li>
  );
}

export default ClassSession;
