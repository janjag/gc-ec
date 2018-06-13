import React, { Component }  from 'react';
import { connect } from 'react-redux';

import PageHeader from './../../components/PageHeader/PageHeader';
import Loader from './../../components/UI/Loader/Loader';
import Calendar from './../../components/Calendar/Calendar';
import Toggle from '../../components/UI/Toggle/Toggle';

import * as actionCreators from '../../store/actions/';

class Calendars extends Component {

    componentDidMount = () => {
        this.props.getCalendars();
    }

    showAllCalendars = () => {
        if (!this.props.visible) {
            this.props.showAll();
            return;
        } 
        this.props.hide();
    }

    render () {
        let showBtnText = this.props.visible ? 'calendars' : 'hidden calendars';
        let list = <Loader />;
        if ( this.props.cList ) {
            list = this.props.cList.map( calendar => {
                let config = localStorage.getItem(calendar.id);
                let isHidden = false;
                if ( config ) {
                    isHidden = JSON.parse(config).hidden;
                } 
                if ( isHidden && !this.props.visible) {
                    return;
                }

                return (
                    <Calendar 
                        key={calendar.id}
                        id={calendar.id}
                        name={calendar.summary}
                        bgColor={calendar.backgroundColor}
                        />
                )
            } );
        } else {
            list = "No calendars found";
        }
        return (
            <div className="Content_wrapper">
                <PageHeader title="Yours Calendars" />
                <Toggle visible={this.showAllCalendars} hidden={!this.props.visible}> {showBtnText} </Toggle>
                {list}
            </div>
        );
    }
} 

const mapStateToProps = state => {
  return {
    visible: state.showAll,
    isAuth: state.signedIn,
    cList: state.calendarsList
  };
};
  
const mapDispatchToProps = dispatch => {
    return {
        getCalendars: () => dispatch(actionCreators.getCalendars()),
        showAll: () => dispatch(actionCreators.showAllCalendars()),
        hide: () => dispatch(actionCreators.hideCalendars())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendars);