import * as ActionTypes from './actionTypes';

const initialState = {
    authorized: false,
    token: null,
    admin: false,
    email: null,
    name: null,
    picture: null
}

export const User = (state = initialState, action) => {
    switch(action.type) {
        case ActionTypes.LOAD_KEY: 
            return {...state, token: action.payload, authorized: true};
        case ActionTypes.CLEAR_KEY:
            return initialState
        default: 
            return state;
    }
}