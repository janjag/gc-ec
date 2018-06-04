import * as actionType from '../actions/actionTypes';
import { updateObject } from '../../shared/helpers';

const initialState = {
    signedIn: false,
    calendarsList: []
}

const saveCalendars = (state, action) => {
    return updateObject(state, {
        calendarsList: action.calList
    });
};

const saveEvents = (state, action) => {
    return updateObject(state, {
        [action.id]: action.events
    });
};

const appReducer = (state = initialState, action) => {
    switch ( action.type ) {
        case actionType.LOG_IN: return updateObject(state, {signedIn: true});
        case actionType.LOG_OUT: return updateObject(state, {signedIn: false});
        case actionType.SAVE_CALENDARS: return saveCalendars(state, action);
        case actionType.SAVE_EVENTS: return saveEvents(state, action);
        default: return state;
    }
}

export default appReducer;