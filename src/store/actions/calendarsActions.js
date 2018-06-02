import * as actionType from './actions';

export const getCalendars = () => {
    return {
        type: actionType.GET_CALENDARS
    }
}

export const getEvents = () => {
    return {
        type: actionType.GET_EVENTS
    }
}