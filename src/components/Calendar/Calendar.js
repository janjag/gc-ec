import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import './Calendar.css';

const Calendar = ( props ) => {

    const calendarStyle = {
        borderColor: props.bgColor
    }

    const id = props.id.split('@');

    return (
        <div className="Calendar_box" style={calendarStyle}>
            <p><i>Calendar:</i><br /><b>{props.name}</b></p>
            <Link className="Details_link" to={'/calendar/' + id[0]}>Details&nbsp;⇨</Link>
        </div>
    );
}

export default withRouter(Calendar);