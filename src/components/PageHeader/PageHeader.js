import React from 'react';

import './PageHeader.css';
import { Settings } from './../UI/Icons/Icons';
import * as helper from './../../shared/helpers';

const PageHeader = ( props ) => {

    return (
        <div className="Page_header">
            <h2 className="Page_title">{props.title}</h2>
            <button className="Logout_button"onClick={helper.userLogout}>Log Out</button>
            <button className="Settings_button" onClick={helper.changeColor}><Settings /></button>
        </div>
    );
}

export default PageHeader;