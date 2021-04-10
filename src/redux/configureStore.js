import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Blogs } from './blogs';
import { Pending } from './pending';
import { Updates } from './updates';
import { User } from './user';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            blogs: Blogs,
            updates: Updates,
            pending: Pending,
            user: User
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}