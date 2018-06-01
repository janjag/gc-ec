import React from 'react';

import { Edit } from './../UI/Icons/Icons';
import './Calendar.css';

const Calendar = ( props ) => {
    const calendarStyle = {
        color: props.bgColor
    }

    return (
        <div className="Calendar_box" id={props.id}>
            Calendar: <span style={calendarStyle}>{props.name}</span>
            <button className="Edit-button"><Edit /></button>
        </div>
    );
}

export default Calendar;