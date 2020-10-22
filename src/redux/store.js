// @packages
import createMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';

// @scripts
import initialState from './state';
import { addAjaxInterceptors } from './interceptors';
import { rootReducer } from './reducers';

// @constants
const { REACT_APP_ENV_NAME } = process.env;

/**
 * @returns {Store} - The redux store.
 */
export const initializeReduxStore = () => {
    const middleware = [thunk];

    if (REACT_APP_ENV_NAME !== 'production') {
        middleware.push(createLogger());
    }

    const state = initialState;

    const store = REACT_APP_ENV_NAME === 'unitTest'
        ? createMockStore(middleware)(state)
        : createStore(
            rootReducer,
            state,
            applyMiddleware(...middleware)
        );

    addAjaxInterceptors(store);
    return store;
};
