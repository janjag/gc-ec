import React, { Component }  from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import PageHeader from '../../components/PageHeader/PageHeader';

import * as actionCreators from '../../store/actions/';

class CalendarDetails extends Component {
    componentDidMount = () => {
        this.fetchEvents();
    }

    fetchEvents = (tStart, tEnd) => {
        const path = window.location.pathname.split('/');
        const localID = path[2];
        const calendar = JSON.parse(localStorage.getItem('calendars')).find(item => item.id.includes(localID));


        console.log(calendar);

        this.props.getEvents(calendar.id, null, null);
    }

    render () {
        return (
            <div className="Content_wrapper">
                <PageHeader title="Calendar details" />
                <Link to="/" className="Basic_button">⇦ Back</Link>
            </div>
        );
    }
} 

const mapStateToProps = state => {
    return {
        isAuth: state.signedIn,
        cList: state.calendarsList
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getEvents: (id, start, end) => dispatch(actionCreators.getEvents(id, start, end))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CalendarDetails));