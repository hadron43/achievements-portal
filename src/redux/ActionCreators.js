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
    .then(response => response.json())
    .then(({key}) => {
        console.log(key);
        dispatch(loadKey(key));
        return key;
    })
    .then((key) => {
        console.log(key);
        let token_head = 'Token '+key;
        
        // Fetch profile details
        fetch(baseUrl+'auth/api/profile/', {
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
    })
    .catch(err => {
        console.log(err);
    });
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