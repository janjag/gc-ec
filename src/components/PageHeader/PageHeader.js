import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import './PageHeader.css';
import { Settings } from './../UI/Icons/Icons';
import * as helper from './../../shared/helpers';

const PageHeader = ( props ) => {

    return (
        <div className="Page_header">
            <h2 className="Page_title">{props.title}</h2>
            <button className="Logout_button"onClick={helper.userLogout}>Log Out</button>
            <button className="Settings_button" onClick={helper.changeColor}><Settings /></button>
            <Link to="/about" className="About-link Ph_link">i</Link>
        </div>
    );
}

export default withRouter(PageHeader);