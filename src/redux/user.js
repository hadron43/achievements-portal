import * as ActionTypes from './actionTypes';
import Cookies from 'cookies-js'

const initialState = {
    authorized: Cookies.get('achieve_token') ? true : false,
    loggingIn: false,
    error: "",
    token: Cookies.get('achieve_token'),
    admin: false,

    profileLoaded: false,
    profile: {},
    achievements: null,
    projects: null,
}

export const User = (state = initialState, action) => {
    var newState = {...state}
    var objIndex
    switch(action.type) {
        case ActionTypes.LOAD_KEY:
            Cookies.set('achieve_token', action.payload)
            return {...state, token: action.payload, authorized: true};
        case ActionTypes.LOAD_PROFILE:
            return {...state, profileLoaded: true, profile: action.payload}
        case ActionTypes.LOAD_PROFILE_ACHIEVEMENTS:
            return {...state, achievements: action.payload}
        case ActionTypes.LOAD_PROFILE_PROJECTS:
            return {...state, projects: action.payload}
        case ActionTypes.CLEAR_USER_DATA:
            Cookies.expire('achieve_token')
            Cookies.expire('csrftoken')
            initialState.authorized = false;
            initialState.token = undefined;
            return initialState;
        case ActionTypes.LOGIN_FAILED:
            return {...state, error: action.payload}
        case ActionTypes.LOGGING_IN:
            return {...state, loggingIn: action.payload}
        case ActionTypes.ACHIEVEMENT_DELETING:
            if(!state.achievements)
                return state
            newState.achievements = [...newState.achievements]
            objIndex = newState.achievements.findIndex((obj => obj.id === action.payload));
            if(objIndex < 0)
                return newState
            newState.achievements[objIndex].deleting = true
            newState.achievements[objIndex].error = ''
            return newState
        case ActionTypes.ACHIEVEMENT_DELETED:
            if(!state.achievements)
                return state
            newState.achievements = [...newState.achievements]
            objIndex = newState.achievements.findIndex((obj => obj.id === action.payload));
            if(objIndex < 0)
                return newState
            newState.achievements[objIndex].deleting = false
            newState.achievements[objIndex].deleted = true
            newState.achievements[objIndex].error = ''
            return newState
        case ActionTypes.PROJECT_DELETING:
            if(!state.projects)
                return state
            newState.projects = [...newState.projects]
            objIndex = newState.projects.findIndex((obj => obj.id === action.payload));
            if(objIndex < 0)
                return newState
            console.log(newState)
            newState.projects[objIndex].deleting = true
            newState.projects[objIndex].error = ''
            return newState
        case ActionTypes.PROJECT_DELETED:
            if(!state.projects)
                return state
            newState.projects = [...newState.projects]
            objIndex = newState.achievements.findIndex((obj => obj.id === action.payload));
            if(objIndex < 0)
                return newState
            newState.projects[objIndex].deleting = false
            newState.projects[objIndex].deleted = true
            newState.projects[objIndex].error = ''
            return newState
        default:
            return state;
    }
}