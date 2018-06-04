import React, { Component }  from 'react';
import { connect } from 'react-redux';

import PageHeader from './../../components/PageHeader/PageHeader';
import Loader from './../../components/UI/Loader/Loader';
import Calendar from './../../components/Calendar/Calendar';

import * as actionCreators from '../../store/actions/';

class Calendars extends Component {

    componentDidMount = () => {
        this.props.getCalendars();
    }

    render () {
        let list = <Loader />;
        if ( this.props.cList ) {
            list = this.props.cList.map( calendar => (
                <Calendar 
                    key={calendar.id}
                    id={calendar.id}
                    name={calendar.summary}
                    bgColor={calendar.backgroundColor}
                    />
            ) );
        }
        return (
            <div className="Content_wrapper">
                <PageHeader title="Yours Calendars" />
                {list}
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
        getCalendars: () => dispatch(actionCreators.getCalendars())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendars);