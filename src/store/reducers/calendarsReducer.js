import * as actionType from '../actions/actions';

const initialState = {
    calendarsList: []
}

const calendarsReducer = (state = initialState, action) => {
    switch ( action.type ) {
        case actionType.GET_CALENDARS:
            return {
                ...state
            };
        case actionType.GET_EVENTS:
            return {
                ...state
            };
        default: return state;
    }
}

export default calendarsReducer;