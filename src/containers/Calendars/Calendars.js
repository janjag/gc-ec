import React, { Component }  from 'react';
import { connect } from 'react-redux';

import PageHeader from './../../components/PageHeader/PageHeader';
import Loader from './../../components/UI/Loader/Loader';
import Calendar from './../../components/Calendar/Calendar';

class Calendars extends Component {
    state = {
        calendarsList: [],
        loading: true
    }

    componentDidMount = () => {
        this.fetchCalendarsList();
    }

    fetchCalendarsList = () => {
        if(this.props.isAuth) {
            window.gapi.client.calendar.calendarList.list({
                minAccessRole: 'writer'
            }).then(response => {
                let updatedResponse = response.result.items;
                let transformedResponse = [];
                updatedResponse.map( element => {
                    const now = new Date();
                    const firstDayPrevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
                    const prevMonthLastDate = new Date(now.getFullYear(), now.getMonth() -1, 31);
                    let newElement = {
                        ...element,
                        events: [],
                        hourlyRate: 10,
                        tax: 0.1,
                        computedCount: 0,
                        computedCost: 0,
                        computedTax: 0,
                        computedTotal: 0,
                        hidden: false
                    }
                    window.gapi.client.calendar.events.list({
                        calendarId: element.id,
                        timeMin: firstDayPrevMonth.toISOString(),
                        timeMax: prevMonthLastDate.toISOString(),
                        maxResults: 2500,
                        singleEvents: true,
                        orderBy: 'startTime',
                      }).then(response => {
                        let eventList = response.result.items;
                        let total = 0;
                        let cost = 0;
                        let computedTax = 0;
                        let tasks = [];
                        if (eventList.length) {
                            eventList.map((event, i) => {
                                // if event has specified color - it means that it overlaps with other event(s) and should be skipped
                                if(event.colorId) {
                                    return;
                                }
                                    const start = event.start.dateTime || event.start.date;
                                    const eventLength = Math.abs(new Date(event.end.dateTime).getTime() - new Date(event.start.dateTime).getTime()) / 60000 || 0;
                                    total += eventLength;
                                
                                    let item = {
                                        name: event.summary,
                                        length: eventLength
                                    }
                                    tasks.push(item);
                            });
                            cost = (total / 60) * newElement.hourlyRate;
                            computedTax = cost * newElement.tax;

                            newElement = {
                                ...newElement,
                                events: eventList,
                                computedCount: eventList.length,
                                computedCost: cost,
                                computedTax: computedTax,
                                computedTotal: total
                            }

                            console.log(newElement);
                            transformedResponse.push(newElement);
                            return newElement;
                        }
                    }).then( () => {
                        this.setState( {
                            calendarsList: transformedResponse,
                            loading: false
                        });
                    });
                });
            }); 
        }
    }

    render () {
        let calendarsList = <Loader />;

        if ( !this.props.loading ) {
            console.log(this.state.calendarsList);
            calendarsList = this.state.calendarsList.map( calendar => (
                <Calendar 
                    key={calendar.id}
                    id={calendar.id}
                    name={calendar.summary}
                    bgColor={calendar.backgroundColor}
                    count={calendar.computedCount}
                    cost={calendar.computedCost}
                    tax={calendar.computedTax}
                    total={calendar.computedTotal}
                    />
            ) )
        }
        return (
            <div className="Content_wrapper">
                <PageHeader title="Yours Calendars" />
                {calendarsList}
            </div>
        );
    }
} 

const mapStateToProps = state => {
  return {
    isAuth: state.signedIn
  };
};

export default connect(mapStateToProps)(Calendars);