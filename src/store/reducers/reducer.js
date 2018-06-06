import * as actionType from '../actions/actionTypes';
import { updateObject } from '../../shared/helpers';

const initialState = {
    showAll: false,
    signedIn: false,
    calendarsList: []
}

const saveCalendars = (state, action) => {
    return updateObject(state, {
        calendarsList: action.calList
    });
};

const appReducer = (state = initialState, action) => {
    switch ( action.type ) {
        case actionType.LOG_IN: return updateObject(state, {signedIn: true});
        case actionType.LOG_OUT: return updateObject(state, {signedIn: false});
        case actionType.SHOW_ALL_CALENDARS: return updateObject(state, {showAll: true});
        case actionType.HIDE_CALENDARS: return updateObject(state, {showAll: false});
        case actionType.SAVE_CALENDARS: return saveCalendars(state, action);
        default: return state;
    }
}

export default appReducer;