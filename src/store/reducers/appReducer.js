import * as actionType from '../actions/actions';

const initialState = {
    signedIn: false,
    loading: true
}

const appReducer = (state = initialState, action) => {
    switch ( action.type ) {
        case actionType.LOG_IN:
            return {
                ...state,
                signedIn: true
            };
        case actionType.LOG_OUT:
            return {
                ...state,
                signedIn: false
            };
        default: return state;
    }
}

export default appReducer;