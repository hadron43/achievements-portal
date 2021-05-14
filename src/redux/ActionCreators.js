import * as ActionTypes from './actionTypes';
import {data as Updates} from '../shared/updates';
import { baseUrl } from '../shared/baseUrl';
import fetch from 'cross-fetch';

// Thunk, returns a function
export const fetchUpdates = () => (dispatch) => {
    dispatch(updatesLoading(true));
    // Simulate delay by server
    setTimeout(() => {
        dispatch(addUpdates(Updates));
    }, 2000);
}

export const loadKey = (key) => ({
    type: ActionTypes.LOAD_KEY,
    payload: key
});

export const loadProfile = (profile) => ({
    type: ActionTypes.LOAD_PROFILE,
    payload: profile
});

export const loadProfileAchievements = (achievements) => ({
    type: ActionTypes.LOAD_PROFILE_ACHIEVEMENTS,
    payload: achievements
});

// Clear User Data and token
export const clearUserData = () => ({
    type: ActionTypes.CLEAR_USER_DATA
});

// Login thunk, returns a function
export const login = (username, password) => (dispatch) => {
    dispatch(loggingIn(true));
    return fetch(baseUrl+'rest-auth/login/', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        }) // body data type must match "Content-Type" header
    })
    .then(response => {
        if(!response.ok)
            throw Error("Error occurred!");
        return response;
    })
    .then(response => response.json())
    .then(({key}) => {
        console.log(key);
        dispatch(loadKey(key));
        dispatch(loggingIn(false));
    })
    .catch(err => {
        console.log(err);
        dispatch(loggingIn(false));
        dispatch(loginFailed(err.message));
    });
}

export const loggingIn = (value) => ({
    type: ActionTypes.LOGGING_IN,
    payload: value
})

export const loginFailed = (err) => ({
    type: ActionTypes.LOGIN_FAILED,
    payload: err
})

// Thunk to fetch profile
export const fetchUserProfile = (key) => (dispatch) => {
    let token_head = 'Token '+key;
    // Fetch profile details
    return fetch(baseUrl+'auth/api/profile/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token_head
        }
    })
    .then(response => response.json())
    .then(response => {
        // console.log(response);
        dispatch(loadProfile(response));
    })
    .catch(err => {
        console.log(err);
    })
}

export const fetchUserAchievements = (key) => (dispatch) => {
    let token_head = 'Token '+key;
    // Fetch achievements of the logged in user
    fetch(baseUrl+'main/api/achievement/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token_head
        }
    })
    .then(response => response.json())
    .then(response => {
        console.log(response);
        dispatch(loadProfileAchievements(response));
    })
    .catch(err => {
        console.log(err);
    })
}

// Create action to indicate updates are loading
export const updatesLoading = () => ({
    type: ActionTypes.UPDATES_LOADING
});

// Create action to indicate loading updates has failed
export const updatesFailed = (errmess) => ({
    type: ActionTypes.UPDATES_FAILED,
    payload: errmess
});

// Create action to add loaded updates
export const addUpdates = (updates) => ({
    type: ActionTypes.ADD_UPDATES,
    payload: updates
});


export const fetchStudentsList = (key) => (dispatch) => {
    let token_head = 'Token '+key;
    dispatch(studentsListLoading(true));
    fetch(baseUrl+'main/api/get-students', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token_head
        }
    })
    .then(response => response.json())
    .then(response => {
        dispatch(loadStudentsList(response.students));
    })
    .catch(err => {
        console.log(err);
        dispatch(studentsListLoading(false));
    })
}

export const loadStudentsList = (students) => ({
    type: ActionTypes.LOAD_STUDENTS_LIST,
    payload: students
})

export const studentsListLoading = (value) => ({
    type: ActionTypes.STUDENTS_LIST_LOADING,
    payload: value
})

export const fetchProfessorsList = (key) => (dispatch) => {
    dispatch(professorsListLoading(true));
    let token_head = 'Token '+key;
    fetch(baseUrl+'main/api/get-professors', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token_head
        }
    })
    .then(response => response.json())
    .then(response => {
        dispatch(loadProfessorsList(response.professors));
    })
    .catch(err => {
        console.log(err);
        dispatch(professorsListLoading(false));
    })
}

export const loadProfessorsList = (professors) => ({
    type: ActionTypes.LOAD_PROFESSORS_LIST,
    payload: professors
})

export const professorsListLoading = (value) => ({
    type: ActionTypes.PROFESSORS_LIST_LOADING,
    payload: value
})

export const fetchInstitutesList = (key) => (dispatch) => {
    dispatch(institutesLoading(true));
    let token_head = 'Token '+key;
    fetch(baseUrl+'main/api/institution/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token_head
        }
    })
    .then(response => response.json())
    .then(response => {
        dispatch(loadInstitutesList(response));
    })
    .catch(err => {
        console.log(err);
        dispatch(institutesLoading(false));
    })
}

export const loadInstitutesList = (institutes) => ({
    type: ActionTypes.LOAD_INSTITUTES_LIST,
    payload: institutes
})

export const institutesLoading = (value) => ({
    type: ActionTypes.INSTITUTES_LIST_LOADING,
    payload: value
})

export const fetchTagsList = (key) => (dispatch) => {
    dispatch(tagsLoading(true));
    let token_head = 'Token '+key;
    fetch(baseUrl+'main/api/tag/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token_head
        }
    })
    .then(response => response.json())
    .then(response => {
        dispatch(loadTagsList(response));
    })
    .catch(err => {
        console.log(err);
        dispatch(tagsLoading(false));
    })
}

export const addTagList = (tagObj) => ({
    type: ActionTypes.ADD_TAG_LIST,
    payload: tagObj
})

export const loadTagsList = (institutes) => ({
    type: ActionTypes.LOAD_TAGS_LIST,
    payload: institutes
})

export const tagsLoading = (value) => ({
    type: ActionTypes.TAGS_LIST_LOADING,
    payload: value
})

export const postTag = (key, tag, callback, errorFunction) => (dispatch) => {
    let token_head = 'Token '+key;
    fetch(baseUrl+'main/api/tag/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token_head
        },
        body: JSON.stringify({
            title: tag
        })
    })
    .then((response) => {
        if(!response.ok)
            throw new Error('There was a problem adding this tag to the database!')
        return response
    })
    .then(response => response.json())
    .then(response => {
        console.log(response)
        dispatch(addTagList(response))
        return response
    })
    .then((response) => callback(response))
    .catch(error => {
        console.log(error)
        errorFunction(error.message)
    })
}

export const addAchievementPosting = (value) => ({
    type: ActionTypes.ADD_ACHIEVEMENT_POSTING,
    payload: value
})

export const addAchievementPostingError = (message) => ({
    type: ActionTypes.ADD_ACHIEVEMENT_POSTING_ERROR,
    payload: message
})

export const addAchievementPostingSuccess = (message) => ({
    type: ActionTypes.ADD_ACHIEVEMENT_POSTING_SUCCESS,
    payload: message
})

export const postNewAchievement = (key, stateObj, clearFunction) => (dispatch) => {
    dispatch(addAchievementPosting(true));
    let token_head = 'Token '+key;
    console.log(stateObj)
    var bodyObj = {
        title: stateObj.title,
        description: stateObj.description,
        institution: stateObj.institution,
        achievedDate: stateObj.dateofachievement,
        teamMembers: stateObj.team.map(member => member.id),
        mentors: stateObj.mentors.map(mentor => mentor.id),
        tags: stateObj.tags.map(tag => tag.id),
        category: stateObj.category
    }

    console.log(bodyObj)

    fetch(baseUrl+'main/api/achievement/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token_head
        },
        body: JSON.stringify(bodyObj)
    })
    .then((response) => {
        if(!response.ok)
            throw new Error('There was a problem adding this achievement!')
        console.log(response)
        return response
    })
    .then(response => response.json())
    .then(response => {
        // Success dispatch
        clearFunction();
        dispatch(addAchievementPostingSuccess("Your achivement has been posted! Wait for the adming to approve it."))
        return response
    })
    .catch(error => {
        console.log(error)
        dispatch(addAchievementPostingError(error.message))
    })
}