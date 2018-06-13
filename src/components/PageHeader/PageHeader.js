import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import './PageHeader.css';
import { Settings } from './../UI/Icons/Icons';
import * as helper from './../../shared/helpers';
import SidePanel from '../UI/SidePanel/SidePanel';

const PageHeader = ( props ) => {

    return (
        <div className="Page_header">
            <h2 className="Page_title">{props.title}</h2>
            <button className="Logout_button"onClick={helper.userLogout}>Log Out</button>
            <button className="Settings_button" onClick={helper.toggleSidePanel} title="Open settings panel"><Settings /></button>
            <Link to="/about" className="About-link Ph_link">i</Link>
            <SidePanel toggle={() => helper.toggleSidePanel()}>
                <button className="Change_color_button" onClick={ev => helper.changeColor(ev, 'base')}>Default</button>
                <button className="Change_color_button Blue" onClick={ev => helper.changeColor(ev, 'blue')}>I like blue</button>
                <button className="Change_color_button Red" onClick={ev => helper.changeColor(ev, 'red')}>More red!</button>

                <label className="Label" htmlFor="appCurrency">Set app currency</label>
                <input className="Input" id="appCurrency" 
                    onClick={event=> event.stopPropagation()} 
                    onChange={event => helper.setAppCurrency(event)}/>

                <button className="Clear_localstorage" onClick={helper.clearLocalstorage}>Clear local storage</button>
            </SidePanel>
        </div>
    );
}

export default withRouter(PageHeader);