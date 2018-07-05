import React, { Component }  from 'react';
import { Link, withRouter } from 'react-router-dom';
import Flatpickr from 'react-flatpickr';

import '../../../node_modules/flatpickr/dist/flatpickr.css';
import './CalendarDetails.css';

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
        editable: false,
        selcted: 0,
        customDates: {
            start: null,
            end: null
        },
        search: '',
        localCurrency: ''
    };

    componentDidMount = () => this.fetchEvents(this.state.customDates.start, this.state.customDates.end, 0);

    fetchEvents = (start, end, index) => {
        let tStart = start || null;
        let tEnd = end || null;
        const path = window.location.pathname.split('/');
        const localID = path[path.length -1];
        const calendar = JSON.parse(localStorage.getItem('calendars')).find(item => item.id.includes(localID));
        const base = {
            id: calendar.id,
            name: calendar.summary,
            selcted: index
        };

        this.getEvents(calendar.id, tStart, tEnd);
        this.setState(prevState => updateObject(prevState, base));


        this.initalizeSettings(calendar.id, calendar.summary, index);
    }

    fetchCurrentEvents = (index) => {
        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth(), 1);

        this.setState(prevState => {
            updateObject(prevState, {
                customDates: {
                    start: start,
                    end: now
                },
                selcted: index
            })
        });
        this.fetchEvents(start, now, index);
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

    initalizeSettings = (id, name, index) => {
        const initalConfig = {
            id: id,
            name: name,
            selcted: index,
            localCurrency: localStorage.getItem('appCurrency') || ''
        };

        if (localStorage.getItem(id) === null) {
            localStorage.setItem(id, JSON.stringify(initalConfig));
            this.setState(prevState => updateObject(prevState, initalConfig));
        } else {
            let config = JSON.parse(localStorage.getItem(id));

            this.setState(prevState => updateObject(prevState, updateObject(config, {selcted: index})));
        }
    }

    toggleEditable = () => this.setState(prevState => updateObject(prevState, {editable: !prevState.editable}), this.updateConfig);

    toggleVisibility = () => this.setState(prevState => updateObject(prevState, {hidden: !prevState.hidden}), this.updateConfig);
    
    toggleDatePicker = (index) => {
        this.setState(prevState => updateObject(prevState, {
            events: [],
            selcted: index
        }));
    }

    updateProps = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        let update = {[name]: value};
        this.setState(prevState => updateObject(prevState, update), this.updateConfig);
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
                if(!event.summary.toLocaleLowerCase().includes(this.state.search.toLocaleLowerCase())) {
                    return;
                }
                const eventLength = Math.abs(new Date(event.end.dateTime).getTime() - new Date(event.start.dateTime).getTime()) / 60000 || 0;
                eventsLength += eventLength;
                return (
                    <Event 
                        key={event.id}
                        name={event.summary}
                        length={eventLength}
                        start={event.start.dateTime}
                        end={event.end.dateTime}
                    />
                );
            });
        } else {
            eventsList = "No events found";
        }
        const buttonList = [
            {id: 0, name: "Last month", handler: () => this.fetchEvents(null, null, 0)},
            {id: 1, name: "Current month", handler: () => this.fetchCurrentEvents(1)},
            {id: 2, name: "Choose dates", handler: () => this.toggleDatePicker(2)}
        ];
        let buttons = buttonList.map( button => {
            let classList = "Calendar_timeframe_button";
            if (button.id === this.state.selcted) {
                classList += " Active";
            }
            return (
                <button 
                    key={button.id} 
                    className={classList}
                    onClick={button.handler}
                    >
                    {button.name}
                </button>
            );
        });

        // 
        let datePicker = null;
        let pickedDates = null;
        if(this.state.selcted === 2) {
            datePicker = (
                <div className="Input_wrapper">
                    <Flatpickr options={{
                        disableMobile: true,
                        mode: "range",
                        locale: {
                            firstDayOfWeek: 1
                        }
                        }}
                        value={pickedDates}
                        onChange={pickedDates => {
                            this.setState(prevState => updateObject(prevState, {
                                customDates: {
                                    start: pickedDates[0],
                                    end: pickedDates[1]
                                }
                            }));
                        }}
                    />
                    <button className="Basic_button Load_dates"
                        onClick={() => this.fetchEvents(this.state.customDates.start, this.state.customDates.end, 2)}
                    >Choose</button>
                </div>
            );
        }
        let searchBox = (
            <div className="Input_wrapper">
                <label>Search: </label>
                <input 
                    name="search"
                    value={this.state.search}
                    onChange={ (e) => this.updateProps(e)}
                />
            </div>
        );

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
                    currency={this.state.localCurrency}
                />
                {searchBox}
                <div className="Calendar_timeframe_select">
                    {buttons}
                </div>
                {datePicker}
                {eventsList}
                <hr />
                <Link to="/" className="Basic_button">⇦ Back</Link>
            </div>
        );
    }
} 

export default withRouter(CalendarDetails);