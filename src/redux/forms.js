import * as ActionTypes from './actionTypes';

const initialState = {
    professorsList: null,
    professorsLoading: false,

    studentsList: null,
    studentsLoading: false,

    institutesList: null,
    institutesLoading: false,

    tagsList: null,
    tagsLoading: false,

    awardCategory: [
        { id: 0, title: 'Not Applicable' },
        { id: 1, title: 'Intra College' },
        { id: 2, title: 'Inter College' },
        { id: 3, title: 'District Level' },
        { id: 4, title: 'State Level' },
        { id: 5, title: 'National Level' },
        { id: 6, title: 'International Level' },
    ],

    addAchievementPosting: false,
    addAchievementPostingError: false,
    addAchievementPostingMessage: '',

    addProjectPosting: false,
    addProjectPostingError: false,
    addProjectPostingMessages: ''
}

export const Forms = (state = initialState, action) => {
    switch(action.type) {
        case ActionTypes.PROFESSORS_LIST_LOADING:
            return {...state, professorsLoading: action.payload}
        case ActionTypes.LOAD_PROFESSORS_LIST:
            return {...state, professorsList: action.payload, professorsLoading: false};
        case ActionTypes.STUDENTS_LIST_LOADING:
            return {...state, studentsLoading: action.payload};
        case ActionTypes.LOAD_STUDENTS_LIST:
            return {...state, studentsList: action.payload, studentsLoading: false};
        case ActionTypes.INSTITUTES_LIST_LOADING:
            return {...state, institutesLoading: action.payload};
        case ActionTypes.LOAD_INSTITUTES_LIST:
            return {...state, institutesList: [...action.payload, {
                id: -1,
                title: "Others"
            }], institutesLoading: false};
        case ActionTypes.TAGS_LIST_LOADING:
            return {...state, tagsLoading: action.payload};
        case ActionTypes.LOAD_TAGS_LIST:
            return {...state, tagsList: action.payload, tagsLoading: false};
        case ActionTypes.ADD_TAG_LIST:
            return {...state, tagsList: [...state.tagsList, action.payload]};
        case ActionTypes.ADD_ACHIEVEMENT_POSTING:
            return {...state, addAchievementPosting: action.payload};
        case ActionTypes.ADD_ACHIEVEMENT_POSTING_ERROR:
            return {...state, addAchievementPostingError: true, addAchievementPostingMessage: action.payload, addAchievementPosting: false};
        case ActionTypes.ADD_ACHIEVEMENT_POSTING_SUCCESS:
            return {...state, addAchievementPostingError: false, addAchievementPostingMessage: action.payload, addAchievementPosting: false};
        case ActionTypes.ADD_PROJECT_POSTING:
            return {...state, addProjectPosting: action.payload};
        case ActionTypes.ADD_PROJECT_POSTING_ERROR:
            return {...state, addProjectPostingError: true, addProjectPostingMessage: action.payload, addProjectPosting: false};
        case ActionTypes.ADD_PROJECT_POSTING_SUCCESS:
            return {...state, addProjectPostingError: false, addProjectPostingMessage: action.payload, addProjectPosting: false};
        default: 
            return state;
    }
}