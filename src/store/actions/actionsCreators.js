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

export const getEvents = (calId, startTime, endTime) => {
    return dispatch => {
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
        }).then(response => {
            let eventList = response.result.items;
            dispatch(saveEvents(calId, eventList));
        });
    }
}

export const saveEvents = (id,list) => {
    return {
        type: actionType.SAVE_EVENTS,
        id: id,
        events: list
    }
}