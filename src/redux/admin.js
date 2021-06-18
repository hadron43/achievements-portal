import * as ActionTypes from './actionTypes';

const initialState = {
    pendingProjects: null,
    pendingProjectsLoading: false,
    pendingProjectsLoadingError: '',

    pendingAchievements: null,
    pendingAchievementsLoading: false,
    pendingAchievementsLoadingError: ''
}

export const Admin = (state = initialState, action) => {
    switch(action.type) {
        case ActionTypes.ADD_PENDING_PROJECTS:
            return {...state, pendingProjects: action.payload, pendingProjectsLoading: false, pendingProjectsLoadingError: ''};
        case ActionTypes.PENDING_PROJECTS_LOADING:
            return {...state, pendingProjectsLoading: action.payload}
        case ActionTypes.PENDING_PROJECTS_LOADING_ERROR:
            return {...state, pendingProjectsLoading: false, pendingProjectsLoadingError: action.payload}
        case ActionTypes.ADD_PENDING_ACHIEVEMENTS:
            return {...state, pendingAchievements: action.payload, pendingAchievementsLoading: false, pendingAchievementsLoadingError: ''};
        case ActionTypes.PENDING_ACHIEVEMENTS_LOADING:
            return {...state, pendingAchievementsLoading: action.payload}
        case ActionTypes.PENDING_ACHIEVEMENTS_LOADING_ERROR:
            return {...state, pendingAchievementsLoading: false, pendingAchievementsLoadingError: action.payload}
        default: 
            return state;
    }
}