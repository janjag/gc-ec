const initialState = {
    signedIn: false
}

const reducer = (state = initialState, action) => {
    switch ( action.type ) {
        case 'LOG_IN':
            return {
                ...state,
                signedIn: true
            };
        case 'LOG_OUT':
            return {
                ...state,
                signedIn: false
            };
        default: return state;
    }
}

export default reducer;