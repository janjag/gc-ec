import * as actionType from './actions';

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