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

// Clear token
export const clearKey = () => ({
    type: ActionTypes.CLEAR_KEY
});

// Login thunk, returns a function
export const login = (username, password) => (dispatch) => {
    return fetch(baseUrl+'rest-auth/login/', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
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