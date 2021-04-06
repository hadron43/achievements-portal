import { combineReducers, createStore } from 'redux';
import { Blogs } from './blogs';
import { Pending } from './pending';
import { Updates } from './updates';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            blogs: Blogs,
            updates: Updates,
            pending: Pending
        })
    );

    return store;
}