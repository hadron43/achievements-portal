// import * as ActionTypes from './actionTypes';

export const User = (state = {
        authorized: false,
        token: null,
        admin: false,
        email: null,
        name: null,
        picture: null
    }, action) => {
    switch(action.type) {

        default: 
            return state;
    }
}