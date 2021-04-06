import * as ActionTypes from './actionTypes';

export const addDepartment = (rank, deptName, points) => ({
    type: ActionTypes.ADD_DEPARTMENT,
    payload: {
        rank: rank,
        deptName: deptName,
        points: points
    }
});