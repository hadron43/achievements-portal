import * as ActionTypes from './actionTypes';
import {data as Updates} from '../shared/updates';

// Thunk, returns a function
export const fetchUpdates = () => (dispatch) => {
    dispatch(updatesLoading(true));
    // Simulate delay by server
    setTimeout(() => {
        dispatch(addUpdates(Updates));
    }, 2000);
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