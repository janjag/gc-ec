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

                console.log(updatedResponse);
                updatedResponse.map( element => {
                    let newElement = {
                        ...element,
                        events: [],
                        hourlyRate: null,
                        tax: null
                    }

                    console.log(newElement);
                    return newElement;
                });

                this.setState( {
                    calendarsList: updatedResponse,
                    loading: false
                });
            }); 
        }
    }

    render () {
        let calendarsList = <Loader />;

        if ( !this.props.loading ) {
            calendarsList = this.state.calendarsList.map( calendar => (
                <Calendar 
                    key={calendar.id}
                    id={calendar.id}
                    name={calendar.summary}
                    bgColor={calendar.backgroundColor}
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