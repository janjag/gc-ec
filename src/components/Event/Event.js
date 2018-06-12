import React from 'react';

import './Event.css';

import { Clock } from '../UI/Icons/Icons';

const Event = ( props ) => {
    let data = 'Full day event';
    if (props.length > 0) {
        data = `${props.length} min / ${props.length / 60} h`;
    }

    return (
        <div className="Event_box">
            <p>
                <i className="Event_box_title">{props.name}</i>
                <Clock name={"Event_icon"} /> {data}
            </p>
        </div>
    );
}

export default Event;