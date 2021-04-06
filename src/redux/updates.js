import { data as UPDATES } from '../shared/updates';
import * as ActionTypes from './actionTypes';

export const Updates = (state = UPDATES, action) => {
    switch(action.type) {
        case ActionTypes.ADD_DEPARTMENT:
            var dept = action.payload
            var new_state = {...state}
            new_state.active_departments.toppers.push(dept)
            return new_state

        default: 
            return state;
    }
}