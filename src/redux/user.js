import * as ActionTypes from './actionTypes';

const initialState = {
    authorized: sessionStorage.getItem('key') ? true : false,
    token: sessionStorage.getItem('key'),
    admin: false,

    profileLoaded: false,
    profile: {},
    achievements: null
}

export const User = (state = initialState, action) => {
    switch(action.type) {
        case ActionTypes.LOAD_KEY:
            sessionStorage.setItem('key', action.payload);
            return {...state, token: action.payload, authorized: true};
        case ActionTypes.LOAD_PROFILE:
            return {...state, profileLoaded: true, profile: action.payload}
        case ActionTypes.LOAD_PROFILE_ACHIEVEMENTS:
            return {...state, achievements: action.payload}
        case ActionTypes.CLEAR_USER_DATA:
            sessionStorage.clear();
            return initialState;
        default: 
            return state;
    }
}