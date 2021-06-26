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
    var newState = {...state}
    var objIndex
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
        case ActionTypes.PROJECT_APPROVING:
            if(!state.pendingProjects)
                return newState
            newState.pendingProjects = [...newState.pendingProjects]
            objIndex = newState.pendingProjects.findIndex((obj => obj.id === action.payload));
            if(objIndex < 0)
                return newState
            
            newState.pendingProjects[objIndex].approving = true
            newState.pendingProjects[objIndex].error = ''
            console.log("I was here", objIndex)
            return newState
        case ActionTypes.PROJECT_APPROVED:
            console.log("Why am i here?")
            if(!state.pendingProjects)
                return state
            newState.pendingProjects = [...newState.pendingProjects]
            objIndex = newState.pendingProjects.findIndex((obj => obj.id === action.payload));
            if(objIndex < 0)
                return newState
            newState.pendingProjects[objIndex].approving = false
            newState.pendingProjects[objIndex].approved = true
            return newState
        case ActionTypes.PROJECT_REJECTING:
            console.log("Why am i here?")
            if(!state.pendingProjects)
                return state
            newState.pendingProjects = [...newState.pendingProjects]
            objIndex = newState.pendingProjects.findIndex((obj => obj.id === action.payload));
            if(objIndex < 0)
                return newState
            newState.pendingProjects[objIndex].rejecting = true
            newState.pendingProjects[objIndex].error = ''
            return newState
        case ActionTypes.PROJECT_REJECTED:
            console.log("Why am i here?")
            if(!state.pendingProjects)
                return state
            newState.pendingProjects = [...newState.pendingProjects]
            objIndex = newState.pendingProjects.findIndex((obj => obj.id === action.payload));
            if(objIndex < 0)
                return newState
            newState.pendingProjects[objIndex].rejecting = false
            newState.pendingProjects[objIndex].rejected = true
            return newState
        case ActionTypes.PROJECT_ERROR:
            if(!state.pendingProjects)
                return state
            newState.pendingProjects = [...newState.pendingProjects]
            objIndex = newState.pendingProjects.findIndex((obj => obj.id === action.payload[0]));
            if(objIndex < 0)
                return newState
            newState.pendingProjects[objIndex].rejecting = false
            newState.pendingProjects[objIndex].approving = false
            newState.pendingProjects[objIndex].error = action.payload[1]
            return newState
        default: 
            return state;
    }
}