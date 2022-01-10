import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Updates } from './updates';
import { User } from './user';
import { Forms } from './forms';
import { Admin } from './admin';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            updates: Updates,
            user: User,
            forms: Forms,
            admin: Admin
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}