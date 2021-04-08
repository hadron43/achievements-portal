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

// Dispatch an action to indicate updates are loading
export const updatesLoading = () => ({
    type: ActionTypes.UPDATES_LOADING
});

export const updatesFailed = (errmess) => ({
    type: ActionTypes.UPDATES_FAILED,
    payload: errmess
});

export const addUpdates = (updates) => ({
    type: ActionTypes.ADD_UPDATES,
    payload: updates
});