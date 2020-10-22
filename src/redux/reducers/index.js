// @packages
import { combineReducers } from 'redux';

// @scripts
import { searchReducer } from './search';
import { loadingReducer } from './loading';

// @constants
const appReducer = combineReducers({
    loading: loadingReducer,
    search: searchReducer
});

/**
 * We wrap the appReducer into this rootReducer in order to easily
 * handle the CLEAN_STORE event, on which we should reset the state back
 * to the to initial state.
 * @param {Object} state - Current application state.
 * @param {Object} action - Current dispatched action.
 * @returns {Object}
 */
export const rootReducer = (state, action) => {
    const currentState = (action.type === 'CLEAN_STORE')
        ? undefined
        : state;
    return appReducer(currentState, action);
};
