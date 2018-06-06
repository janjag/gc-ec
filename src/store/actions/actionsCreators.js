import * as actionType from './actionTypes';

export const logIn = () => {
    return {
        type: actionType.LOG_IN
    }
}

export const logOut = () => {
    return {
        type: actionType.LOG_OUT
    }
}

export const showAllCalendars = () => {
    return {
        type: actionType.SHOW_ALL_CALENDARS
    }
}

export const hideCalendars = () => {
    return {
        type: actionType.HIDE_CALENDARS
    }
}

export const saveCalendars = (calendarList) => {
    return {
        type: actionType.SAVE_CALENDARS,
        calList: calendarList
    }
}

export const getCalendars = () => {
    return dispatch => {
        window.gapi.client.calendar.calendarList.list({
            minAccessRole: 'writer'
        }).then(response => {
            let calendars = response.result.items;
            return calendars;
        }).then( (calendars) => {
            localStorage.setItem('calendars', JSON.stringify(calendars));
            dispatch(saveCalendars(calendars));
        });
    }
}