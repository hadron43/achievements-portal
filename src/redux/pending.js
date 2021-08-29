import { pending as PENDING } from '../shared/pending';
// import * as ActionTypes from './actionTypes';

export const Pending = (state = PENDING, action) => {
    switch(action.type) {
        default:
            return state;
    }
}