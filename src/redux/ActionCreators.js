import * as ActionTypes from './actionTypes';
import { baseUrl } from '../shared/baseUrl';
import fetch from 'cross-fetch';

// Thunk, returns a function
export const fetchUpdates = (key) => (dispatch) => {
    let token_head = 'Token '+key;
    dispatch(updatesLoading(true));
    return fetch(baseUrl+'main/homepage', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token_head
        }
    })
    .then(response => {
        if(!response.ok)
            throw Error("Error occurred while fetching /main/homepage");
        return response;
    })
    .then(response => response.json())
    .then((response) => {
        dispatch(addUpdates(response));
        dispatch(updatesLoading(false));
    })
    .catch(err => {
        console.log(err);
        dispatch(updatesLoading(false));
    });
}

export const fetchBanners = (key, setBanners, setLoading, setErrorMessage) => {
    setLoading(true)
    fetch(baseUrl+'main/api/banner/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + key
        }
    })
    .then(response => {
        if(!response.ok)
            throw Error("Error occurred while fetching banners!");
        return response;
    })
    .then(response => response.json())
    .then((response) => {
        setLoading(false)
        setBanners(response)
    })
    .catch(err => {
        setLoading(false)
        console.log(err);
        setErrorMessage(err.message)
    });
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
        dispatch(loadKey(key));
        dispatch(loggingIn(false));
    })
    .catch(err => {
        console.log(err);
        dispatch(loggingIn(false));
        dispatch(loginFailed(err.message));
    });
}

export const loginOSA = () => (dispatch) => {
    dispatch(loggingIn(true));
    return fetch(baseUrl+'auth/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if(!response.ok)
            throw Error("Error occurred!");
        return response;
    })
    .then(response => response.json())
    .then(({token}) => {
        dispatch(loadKey(token));
        dispatch(loggingIn(false));
    })
    .catch(err => {
        console.log(err);
        dispatch(loggingIn(false));
        dispatch(loginFailed(err.message));
    });
}

export const logout = (key) => (dispatch) => {
    return fetch(baseUrl+'auth/logout/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + key
        }
    })
    .then(response => {
        if(!response.ok)
            throw Error("Error occurred!");
        dispatch(clearUserData())
    })
    .catch(err => {
        console.log(err);
        dispatch(clearUserData())
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
        console.log(response.profile);
        // acheivements is sometimes null
        if(!response.profile.achievements)
            response.profile.achievements = []
        dispatch(loadProfile(response.profile));
    })
    .catch(err => {
        console.log(err);
    })
}

export const patchUserProfile = (key, id, studObj,
        setSaving, setSavingMessage, setSavingSuccess
    ) => (dispatch) => {
    setSaving(true)
    setSavingMessage('')
    let token_head = 'Token '+key;

    if(!studObj.profile_pic)
        delete studObj.profile_pic

    let form_data = new FormData();
    for(const key in studObj)
        form_data.append(key, studObj[key])

    return fetch(baseUrl+'auth/api/profile/'+id+'/', {
        method: 'PATCH',
        headers: {
            'Authorization': token_head
        },
        body: form_data
    })
    .then(response => {
        if(!response.ok)
            throw new Error('Error while saving profile!')
        return response.json()
    })
    .then(response => {
        setSavingMessage('Profile saved!')
        setSavingSuccess(true)
        setSaving(false)
        dispatch(fetchUserProfile(key))
    })
    .catch(err => {
        console.log(err);
        setSaving(false)
        setSavingSuccess(false)
        setSavingMessage(err.message)
    })
}

export const fetchUserAchievements = (key) => (dispatch) => {
    let token_head = 'Token '+key;
    // Fetch achievements of the logged in user
    fetch(baseUrl+'main/api/achievement', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token_head
        }
    })
    .then(response => response.json())
    .then(response => {
        console.log(response);
        // acheivements is sometimes null
        if(!response.achievements)
            response.achievements = []
        dispatch(loadProfileAchievements(response.achievements));
    })
    .catch(err => {
        console.log(err);
    })
}

export const loadProfileProjects = (projects) => ({
    type: ActionTypes.LOAD_PROFILE_PROJECTS,
    payload: projects
});

export const fetchUserProjects = (key) => (dispatch) => {
    let token_head = 'Token '+key;
    // Fetch achievements of the logged in user
    fetch(baseUrl+'main/api/project/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token_head
        }
    })
    .then(response => response.json())
    .then(response => {
        console.log(response);
        dispatch(loadProfileProjects(response.projects));
    })
    .catch(err => {
        console.log(err);
    })
}

// Create action to indicate updates are loading
export const updatesLoading = (value) => ({
    type: ActionTypes.UPDATES_LOADING,
    payload: value
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

export const addBanners = (banners) => ({
    type: ActionTypes.ADD_BANNERS,
    payload: banners
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

export const postInstitution = (key, institution,  setSaving, setError, setMsg, clear) => {
    let token_head = 'Token '+key;
    setSaving(true)
    setError(false)
    setMsg('')
    fetch(baseUrl+'main/api/institution/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token_head
        },
        body: JSON.stringify({
            title: institution
        })
    })
    .then(response => {
        if(!response.ok) {
            throw new Error('Error while saving institution!')
        }
        return response.json()
    })
    .then(() => {
        setSaving(false)
        setMsg('Successfully saved!')
        clear()
    })
    .catch(err => {
        console.log(err);
        setSaving(false)
        setError(true);
        setMsg(err.message)
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

export const loadTagsList = (tags) => ({
    type: ActionTypes.LOAD_TAGS_LIST,
    payload: tags
})

export const tagsLoading = (value) => ({
    type: ActionTypes.TAGS_LIST_LOADING,
    payload: value
})

export const postTag = (key, tag,  setSaving, setError, setMsg, clear) => {
    let token_head = 'Token '+key;
    setSaving(true)
    setError(false)
    setMsg('')
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
    .then(response => {
        if(!response.ok) {
            throw new Error('Error while saving tag!')
        }
        return response.json()
    })
    .then(() => {
        setSaving(false)
        setMsg('Successfully saved!')
        clear()
    })
    .catch(err => {
        console.log(err);
        setSaving(false)
        setError(true);
        setMsg(err.message)
    })
}

export const fetchProject = (key, projectId, setProjectDetails, setLoading, setErrorMessage) => {
    let token_head = 'Token '+key;
    console.log(token_head)
    fetch(baseUrl+'main/api/project/'+projectId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token_head
        }
    })
    .then((response) => {
        if(!response.ok)
            throw new Error('Project not found!')
        console.log(response.error)
        return response
    })
    .then(response => response.json())
    .then(response => {
        console.log(response)
        setProjectDetails(response)
        setLoading(false)
        return response
    })
    .catch(error => {
        setLoading(false)
        setErrorMessage(error.message)
        console.log(error)
    })
}

export const fetchAchievement = (key, achievementId, setAchievementDetails, setLoading, setErrorMessage) => {
    let token_head = 'Token '+key;
    console.log(token_head)
    fetch(baseUrl+'main/api/achievement/'+achievementId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token_head
        }
    })
    .then((response) => {
        if(!response.ok)
            throw new Error('Achievement not found!')
        console.log(response.error)
        return response
    })
    .then(response => response.json())
    .then(response => {
        console.log(response)
        setAchievementDetails(response)
        setLoading(false)
        return response
    })
    .catch(error => {
        setLoading(false)
        setErrorMessage(error.message)
        console.log(error)
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

const addFileToAchievement = (key, aId, file) => {
    var form_data = new FormData()
    form_data.append('files', file)
    fetch(baseUrl + 'main/api/achievement/'+aId+'/', {
        method: 'PATCH',
        headers: {
            'Authorization' : 'Token '+key
        },
        body: form_data
    })
}

export const postNewAchievement = (key, stateObj, clearFunction) => (dispatch) => {
    dispatch(addAchievementPosting(true));
    let token_head = 'Token '+key;

    var bodyObj = {
        title: stateObj.title,
        description: stateObj.description,
        institution: stateObj.institution,
        achievedDate: stateObj.dateofachievement,
        teamMembers: stateObj.team.map(member => member.user__id),
        tags: stateObj.tags.map(tag => tag.id),
        category: stateObj.category,
        technical: stateObj.type
    }

    fetch(baseUrl+'main/api/achievement/', {
        method: 'POST',
        headers: {
            'Authorization': token_head,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyObj)
    })
    .then((response) => {
        if(!response.ok)
            throw new Error('There was a problem adding this achievement!')
        return response
    })
    .then(response => response.json())
    .then(response => {
        console.log(response, response.id)
        if(stateObj.file)
            addFileToAchievement(key, response.id, stateObj.file)
        return response
    })
    .then(response => {
        // Success dispatch
        clearFunction();
        dispatch(addAchievementPostingSuccess("Your achivement has been posted! Wait for the admin to approve it."))
        return response
    })
    .catch(error => {
        console.log(error)
        dispatch(addAchievementPostingError(error.message))
    })
}

export const patchAchievement = (key, stateObj, clearFunction, aId) => (dispatch) => {
    dispatch(addAchievementPosting(true));
    let token_head = 'Token '+key;

    var bodyObj = {
        title: stateObj.title,
        description: stateObj.description,
        institution: (stateObj.institution.id) ? (stateObj.institution.id) : stateObj.institution,
        achievedDate: stateObj.dateofachievement,
        teamMembers: stateObj.team.map(member => member.user__id),
        tags: stateObj.tags.map(tag => tag.id),
        category: stateObj.category,
        technical: stateObj.type
    }

    fetch(baseUrl+'main/api/achievement/'+aId+'/', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token_head
        },
        body: JSON.stringify(bodyObj)
    })
    .then((response) => {
        if(!response.ok)
            throw new Error('There was a problem saving this achievement!')
        console.log(response)
        return response
    })
    .then(response => response.json())
    .then(response => {
        if(stateObj.file)
            addFileToAchievement(key, response.id, stateObj.file)
        return response
    })
    .then(response => {
        // Success dispatch
        clearFunction();
        dispatch(addAchievementPostingSuccess("Your achivement has been saved! Wait for the admin to approve it."))
        return response
    })
    .catch(error => {
        console.log(error)
        dispatch(addAchievementPostingError(error.message))
    })
}

export const addProjectPosting = (value) => ({
    type: ActionTypes.ADD_PROJECT_POSTING,
    payload: value
})

export const addProjectPostingError = (message) => ({
    type: ActionTypes.ADD_PROJECT_POSTING_ERROR,
    payload: message
})

export const addProjectPostingSuccess = (message) => ({
    type: ActionTypes.ADD_PROJECT_POSTING_SUCCESS,
    payload: message
})

export const postNewProject = (key, stateObj, clearFunction) => (dispatch) => {
    dispatch(addProjectPosting(true));
    let token_head = 'Token '+key;

    var bodyObj = {
        title: stateObj.title,
        description: stateObj.description,
        institution: stateObj.institution,
        startDate: stateObj.startdate,
        endDate: stateObj.enddate,
        field: stateObj.field,
        domain: stateObj.domain,
        url: stateObj.url,
        students: stateObj.team.map(member => member.id),
        mentors: stateObj.mentors.map(mentor => mentor.id),
        tags: stateObj.tags.map(tag => tag.id),
        proof: stateObj.proof
    }

    fetch(baseUrl+'main/api/project/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token_head
        },
        body: JSON.stringify(bodyObj)
    })
    .then((response) => {
        if(!response.ok)
            throw new Error('There was a problem adding this project!')
        console.log(response)
        return response
    })
    .then(response => response.json())
    .then(response => {
        // Success dispatch
        clearFunction();
        dispatch(addProjectPostingSuccess("Your project has been posted! Wait for the admin to approve it."))
        return response
    })
    .catch(error => {
        console.log(error)
        dispatch(addProjectPostingError(error.message))
    })
}

export const patchProject = (key, stateObj, clearFunction, projectId) => (dispatch) => {
    dispatch(addProjectPosting(true));
    let token_head = 'Token '+key;

    var bodyObj = {
        title: stateObj.title,
        description: stateObj.description,
        institution: stateObj.institution.id,
        startDate: stateObj.startdate,
        endDate: stateObj.enddate,
        field: stateObj.field,
        domain: stateObj.domain,
        url: stateObj.url,
        students: stateObj.team.map(member => member.id),
        mentors: stateObj.mentors.map(mentor => mentor.id),
        tags: stateObj.tags.map(tag => tag.id),
        proof: stateObj.proof
    }

    fetch(baseUrl+'main/api/project/'+projectId+'/', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token_head
        },
        body: JSON.stringify(bodyObj)
    })
    .then((response) => {
        if(!response.ok)
            throw new Error('There was a problem saving this project!')
        console.log(response)
        return response
    })
    .then(response => response.json())
    .then(response => {
        // Success dispatch
        clearFunction();
        dispatch(addProjectPostingSuccess("Your project has been saved! Wait for the admin to approve it."))
        return response
    })
    .catch(error => {
        console.log(error)
        dispatch(addProjectPostingError(error.message))
    })
}

export const addPendingProjects = (pendingProjects) => ({
    type: ActionTypes.ADD_PENDING_PROJECTS,
    payload: pendingProjects
})

export const pendingProjectsLoading = (value) => ({
    type: ActionTypes.PENDING_PROJECTS_LOADING,
    payload: value
})

export const pendingProjectsLoadingError = (message) => ({
    type: ActionTypes.PENDING_PROJECTS_LOADING_ERROR,
    payload: message
})

export const fetchPendingProjects = (key, silent=false) => (dispatch) => {
    dispatch(pendingProjectsLoading(true && !silent));
    let token_head = 'Token '+key;
    fetch(baseUrl+'main/api/get-projects-admin', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token_head
        }
    })
    .then((response) => {
        if(!response.ok)
            throw new Error('There was a problem fetching pending projects!')
        console.log(response)
        return response
    })
    .then(response => response.json())
    .then(response => {
        if(response.details)
            throw new Error(response.details)
        return response
    })
    .then(response => {
        dispatch(addPendingProjects(response.unapproved))
        return response
    })
    .catch(error => {
        console.log(error)
        dispatch(pendingProjectsLoadingError(error.message))
    })
}

export const addPendingAchievements = (pendingAchievements) => ({
    type: ActionTypes.ADD_PENDING_ACHIEVEMENTS,
    payload: pendingAchievements
})

export const pendingAchievementsLoading = (value) => ({
    type: ActionTypes.PENDING_ACHIEVEMENTS_LOADING,
    payload: value
})

export const pendingAchievementsLoadingError = (message) => ({
    type: ActionTypes.PENDING_ACHIEVEMENTS_LOADING_ERROR,
    payload: message
})

export const fetchPendingAchievements = (key, silent=false) => (dispatch) => {
    dispatch(pendingAchievementsLoading(true && !silent));
    let token_head = 'Token '+key;
    fetch(baseUrl+'main/api/get-achievements-admin', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token_head
        }
    })
    .then((response) => {
        if(!response.ok)
            throw new Error('There was a problem fetching pending achievements!')
        console.log(response)
        return response
    })
    .then(response => response.json())
    .then(response => {
        if(response.details)
            throw new Error(response.details)
        return response
    })
    .then(response => {
        dispatch(addPendingAchievements(response.unapproved))
        return response
    })
    .catch(error => {
        console.log(error)
        dispatch(pendingAchievementsLoadingError(error.message))
    })
}

export const projectApproving = (projectId) => ({
    type: ActionTypes.PROJECT_APPROVING,
    payload: projectId
})

export const projectApproved = (projectId) => ({
    type: ActionTypes.PROJECT_APPROVED,
    payload: projectId
})

export const projectRejecting = (projectId) => ({
    type: ActionTypes.PROJECT_REJECTING,
    payload: projectId
})

export const projectRejected = (projectId) => ({
    type: ActionTypes.PROJECT_REJECTED,
    payload: projectId
})

export const projectDeleting = (projectId) => ({
    type: ActionTypes.PROJECT_DELETING,
    payload: projectId
})

export const projectDeleted = (projectId) => ({
    type: ActionTypes.PROJECT_DELETED,
    payload: projectId
})

export const projectError = (projectId, message) => ({
    type: ActionTypes.PROJECT_ERROR,
    payload: [projectId, message]
})

export const approveProject = (key, projectId, userId) => (dispatch) => {
    dispatch(projectApproving(projectId));
    let token_head = 'Token '+key;
    fetch(baseUrl+'main/api/project/'+projectId+'/', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token_head
        },
        body: JSON.stringify({
            approved: 'approved',
            approvedBy: userId
        })
    })
    .then((response) => {
        if(!response.ok) {
            console.log(response)
            throw new Error('There was a problem approving this project!')
        }
        console.log(response)
        return response
    })
    .then(response => response.json())
    .then(response => {
        dispatch(projectApproved(projectId))
        return response
    })
    .catch(error => {
        console.log(error)
        dispatch(projectError(projectId, error.message))
    })
}

export const rejectProject = (key, projectId, userId, feedback) => (dispatch) => {
    dispatch(projectRejecting(projectId));
    let token_head = 'Token '+key;
    fetch(baseUrl+'main/api/project/'+projectId+'/', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token_head
        },
        body: JSON.stringify({
            approved: 'rejected',
            approvedBy: userId,
            feedback: feedback
        })
    })
    .then((response) => {
        if(!response.ok) {
            console.log(response)
            throw new Error('There was a problem rejecting this project!')
        }
        return response
    })
    .then(response => response.json())
    .then(response => {
        dispatch(projectRejected(projectId))
        return response
    })
    .catch(error => {
        console.log(error)
        dispatch(projectError(projectId, error.message))
    })
}

export const deleteProject = (key, projectId) => (dispatch) => {
    dispatch(projectDeleting(projectId));
    let token_head = 'Token '+key;
    fetch(baseUrl+'main/api/project/'+projectId+'/', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token_head
        }
    })
    .then((response) => {
        if(!response.ok) {
            console.log(response)
            throw new Error('There was a problem deleting this project!')
        }
        console.log(response)
        return response
    })
    .then(response => {
        dispatch(projectDeleted(projectId))
        return response
    })
    .catch(error => {
        console.log(error)
        // the error here is for pending projects, make something similar here
        // dispatch(projectError(projectId, error.message))
    })
}

export const achievementApproving = (achievementId) => ({
    type: ActionTypes.ACHIEVEMENT_APPROVING,
    payload: achievementId
})

export const achievementApproved = (achievementId) => ({
    type: ActionTypes.ACHIEVEMENT_APPROVED,
    payload: achievementId
})

export const achievementRejecting = (achievementId) => ({
    type: ActionTypes.ACHIEVEMENT_REJECTING,
    payload: achievementId
})

export const achievementRejected = (achievementId) => ({
    type: ActionTypes.ACHIEVEMENT_REJECTED,
    payload: achievementId
})

export const achievementDeleting = (achievementId) => ({
    type: ActionTypes.ACHIEVEMENT_DELETING,
    payload: achievementId
})

export const achievementDeleted = (achievementId) => ({
    type: ActionTypes.ACHIEVEMENT_DELETED,
    payload: achievementId
})

export const achievementError = (achievementId, message) => ({
    type: ActionTypes.ACHIEVEMENT_ERROR,
    payload: [achievementId, message]
})

export const approveAchievement = (key, achievementId, userId) => (dispatch) => {
    dispatch(achievementApproving(achievementId));
    let token_head = 'Token '+key;
    fetch(baseUrl+'main/api/achievement/'+achievementId+'/', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token_head
        },
        body: JSON.stringify({
            approved: 'approved',
            approvedBy: userId
        })
    })
    .then((response) => {
        if(!response.ok) {
            console.log(response)
            throw new Error('There was a problem approving this achievement!')
        }
        console.log(response)
        return response
    })
    .then(response => response.json())
    .then(response => {
        dispatch(achievementApproved(achievementId))
        return response
    })
    .catch(error => {
        console.log(error)
        dispatch(achievementError(achievementId, error.message))
    })
}

export const rejectAchievement = (key, achievementId, userId, feedback) => (dispatch) => {
    dispatch(achievementRejecting(achievementId));
    let token_head = 'Token '+key;
    fetch(baseUrl+'main/api/achievement/'+achievementId+'/', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token_head
        },
        body: JSON.stringify({
            approved: 'rejected',
            approvedBy: userId,
            feedback: feedback
        })
    })
    .then((response) => {
        if(!response.ok) {
            console.log(response)
            throw new Error('There was a problem rejecting this achievement!')
        }
        return response
    })
    .then(response => response.json())
    .then(response => {
        dispatch(achievementRejected(achievementId))
        return response
    })
    .catch(error => {
        console.log(error)
        dispatch(achievementError(achievementId, error.message))
    })
}

export const deleteAchievement = (key, achievementId) => (dispatch) => {
    dispatch(achievementDeleting(achievementId));
    let token_head = 'Token '+key;
    fetch(baseUrl+'main/api/achievement/'+achievementId+'/', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token_head
        }
    })
    .then((response) => {
        if(!response.ok) {
            console.log(response)
            throw new Error('There was a problem deleting this achievement!')
        }
        console.log(response)
        return response
    })
    .then(response => {
        dispatch(achievementDeleted(achievementId))
        return response
    })
    .catch(error => {
        console.log(error)
        // error is for pending achievements, make something similar here
        // dispatch(achievementError(achievementId, error.message))
    })
}