// @packages
import axios from 'axios';

// @scripts
import { hideLoadingPage, showLoadingPage } from './actions';

/**
 * @param {Object} error - The error to handle.
 * @param {Store} store - The redux store.
 */
const handleError = (error, store) => {
    store.dispatch(hideLoadingPage());
    // eslint-disable-next-line no-console
    console.error(error);
};

/**
 * @param {Store} store - The redux store.
 */
const addRequestInterceptors = (store) => {
    axios.interceptors.request.use(
        (request) => {
            const isLoadingVisible = store.getState().loading.isVisible;

            if (!isLoadingVisible) {
                store.dispatch(showLoadingPage());
            }

            return request;
        },
        (error) => handleError(error, store)
    );
};

/**
 * @param {Store} store - The redux store.
 */
const addResponseInterceptors = (store) => {
    axios.interceptors.response.use(
        (response) => {
            const isLoadingVisible = store.getState().loading.isVisible;

            if (isLoadingVisible) {
                store.dispatch(hideLoadingPage());
            }

            return response.data;
        },
        (error) => handleError(error, store)
    );
};

/**
 * @param {Store} store - The redux store.
 */
export const addAjaxInterceptors = (store) => {
    addRequestInterceptors(store);
    addResponseInterceptors(store);
};
