import React from 'react';

import { Edit } from './../UI/Icons/Icons';
import './Calendar.css';

const Calendar = ( props ) => {
    console.log(props);
    const calendarStyle = {
        color: props.bgColor
    }
    const newId = props.id.split('@');

    return (
        <div className="Calendar_box">
            <div className="Calendar_box_header">
                <i>Calendar:</i> <span style={calendarStyle}>{props.name}</span>
                <button className="Edit-button" id={newId[0]}><Edit /></button>
            </div>
            <p><i>Events:</i> {props.count}</p>
            <p><i>Total:</i> <b>{props.total / 60} h</b> / {props.total} min</p>
            <p><b>{props.cost} PLN</b> brutto / Tax: {props.tax} PLN <br /> <b>{props.cost - props.tax} PLN</b> netto</p>
        </div>
    );
}

export default Calendar;