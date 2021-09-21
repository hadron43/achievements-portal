import * as ActionTypes from './actionTypes';

export const Updates = (state = {
        isLoading: false,
        errMess: null,
        updates: {}
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_UPDATES:
            return {...state, isLoading: false, errMess: null, updates: action.payload}

        case ActionTypes.UPDATES_LOADING:
            return {...state, isLoading: action.payload, errMess: null}

        case ActionTypes.UPDATES_FAILED:
            return {...state, isLoading: false, errMess: action.payload, updates: {}}

        default:
            return state;
    }
}