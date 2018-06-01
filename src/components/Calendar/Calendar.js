import React from 'react';

import { Edit } from './../UI/Icons/Icons';
import './Calendar.css';

const Calendar = ( props ) => {
    console.log(props);
    const calendarStyle = {
        color: props.bgColor
    }

    return (
        <div className="Calendar_box">
            <div className="Calendar_box_header">
                <b>Calendar:</b> <span style={calendarStyle}>{props.name}</span>
                <button className="Edit-button" id={props.id}><Edit /></button>
            </div>
            <p><b>Events:</b> {props.count}</p>
            <p><b>Total:</b> {props.total}min / {props.total / 60}h</p>
            <p>{props.cost}PLN brutto / Tax: {props.tax}PLN <br /> {props.cost - props.tax} PLN netto</p>
        </div>
    );
}

export default Calendar;