import React from 'react';
import { withRouter } from 'react-router-dom';
import './About.css';

const About = ( {history} ) => {

    return (
        <div className="Content_wrapper">
            <h2 className="About_title">About <span>Google Calendar Event Counter</span></h2>

            <p>
                This simple web app was build with <code>create-react-app</code> for practice with <i>Google Calendar API</i>, lerning React and to help counting total time spent on projects in previus month.
            </p>
            <p>
                For now it will cycle through all calendars that you have at least <code>writer</code> permission.
            </p>

            <hr />
            <h4 className="App_assumptions">Assumptions:</h4>
            <ul className="App_assumptions_list">
                <li>Days off are marked as full day events</li>
                <li>Events that overlaps with other events should have it color changed - and won't be counted. Partial overlap is curently not supported.</li>
            </ul>

            <button onClick={history.goBack} className="Basic_button">⇦ Back</button>
        </div>
    );
};

export default withRouter(About);