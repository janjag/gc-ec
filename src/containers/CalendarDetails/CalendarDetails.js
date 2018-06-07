import React, { Component }  from 'react';
import { Link, withRouter } from 'react-router-dom';

import CalendarConfig from '../../components/CalendarConfig/CalendarConfig';
import Loader from '../../components/UI/Loader/Loader';
import Event from '../../components/Event/Event';
import { updateObject } from '../../shared/helpers';

class CalendarDetails extends Component {
    state = {
        id: null,
        name: null,
        events: [],
        tax: 0,
        hRate: 0,
        hidden: false,
        total: null,
        editable: false
    };

    componentDidMount = () => {
        this.fetchEvents();
    }

    fetchEvents = (tStart, tEnd) => {
        const path = window.location.pathname.split('/');
        const localID = path[2];
        const calendar = JSON.parse(localStorage.getItem('calendars')).find(item => item.id.includes(localID));
        const base = {
            id: calendar.id,
            name: calendar.summary
        };

        this.getEvents(calendar.id, null, null);
        this.setState(updateObject(this.state, base));


        this.initalizeSettings(calendar.id, calendar.summary);
    }

    getEvents = (calId, startTime, endTime) => {
        const now = new Date();
        const firstDayPrevMonth = startTime || new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const prevMonthLastDate = endTime || new Date(now.getFullYear(), now.getMonth() -1, 31);

        window.gapi.client.calendar.events.list({
            calendarId: calId,
            timeMin: firstDayPrevMonth.toISOString(),
            timeMax: prevMonthLastDate.toISOString(),
            maxResults: 2500,
            singleEvents: true,
            orderBy: 'startTime',
        }).then(response => this.setState(prevState => updateObject(prevState, {events: response.result.items})));
    }

    initalizeSettings = (id, name) => {
        const initalConfig = {
            id: id,
            name: name
        };

        if (localStorage.getItem(id) === null) {
            localStorage.setItem(id, JSON.stringify(initalConfig));
        } else {
            let config = JSON.parse(localStorage.getItem(id));

            this.setState(prevState => updateObject(prevState, config));
        }
    }

    toggleEditable = () => {
        this.setState(prevState => updateObject(prevState, {editable: !prevState.editable}));

        setTimeout(this.updateConfig, 100);
    }

    toggleVisibility = () => {
        this.setState(prevState => updateObject(prevState, {hidden: !prevState.hidden}));

        setTimeout(this.updateConfig, 100);
    }

    updateProps = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        let update = {[name]: value};
        this.setState(prevState => updateObject(prevState, update));

        setTimeout(this.updateConfig, 100);
    }

    updateConfig = () => {
        let id = this.state.id;
        let ls = JSON.parse(localStorage.getItem(id));

        localStorage.setItem(id, JSON.stringify(updateObject(ls, this.state)));
    }

    render () {
        let eventsLength = 0;
        let eventsList = <Loader />
        if ( this.state.events ) {
            eventsList = this.state.events.map( event => {
                // if event has specified color - it means that it overlaps with other event(s) and should be skipped
                if(event.colorId) {
                    return;
                }
                const eventLength = Math.abs(new Date(event.end.dateTime).getTime() - new Date(event.start.dateTime).getTime()) / 60000 || 0;
                eventsLength += eventLength;
                return (
                    <Event 
                        key={event.id}
                        name={event.summary}
                        length={eventLength}
                    />
                );
            });
        } else {
            eventsList = "No events found";
        }
        return (
            <div className="Content_wrapper">
                <div className="Calendar_header">
                    <h2>{this.state.name}</h2>
                    <Link to="/" className="Basic_button">⇦</Link>
                </div>
                <CalendarConfig 
                    total={eventsLength}
                    editable={this.state.editable}
                    hRate={this.state.hRate}
                    tax={this.state.tax}
                    edit={this.toggleEditable}
                    update={this.updateProps}
                    hidden={this.state.hidden}
                    visible={this.toggleVisibility}
                />
                {eventsList}
                <hr />
                <Link to="/" className="Basic_button">⇦ Back</Link>
            </div>
        );
    }
} 

export default withRouter(CalendarDetails);