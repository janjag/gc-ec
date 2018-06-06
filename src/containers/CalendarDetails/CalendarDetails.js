import React, { Component }  from 'react';
import { Link, withRouter } from 'react-router-dom';

import PageHeader from '../../components/PageHeader/PageHeader';
import CalendarConfig from '../../components/CalendarConfig/CalendarConfig';
import Loader from '../../components/UI/Loader/Loader';
import Event from '../../components/Event/Event';
import { updateObject } from '../../shared/helpers';

class CalendarDetails extends Component {
    state = {
        id: null,
        events: [],
        tax: 0.1,
        hRate: 10,
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

        this.getEvents(calendar.id, null, null);
        this.setState({id: calendar.id});


        this.initalizeSettings(calendar.id);
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

    initalizeSettings = (id) => {
        const initalConfig = {
            id: id
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
        }
        return (
            <div className="Content_wrapper">
                <PageHeader title="Calendar details" />
                <CalendarConfig 
                    total={eventsLength}
                    editable={this.state.editable}
                    hRate={this.state.hRate}
                    tax={this.state.tax}
                    edit={this.toggleEditable}
                    update={this.updateProps}
                />
                {eventsList}
                <hr />
                <Link to="/" className="Basic_button">⇦ Back</Link>
            </div>
        );
    }
} 

export default withRouter(CalendarDetails);