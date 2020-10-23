// @scripts
import initialState from '../state';
import { SHOW_LOADING_PAGE, HIDE_LOADING_PAGE } from '../actions';

/**
 * @returns {boolean}
 */
export const loadingReducer = (
    state = initialState.loading.isVisible, action
) => {
    switch (action.type) {
        case SHOW_LOADING_PAGE:
            return { isVisible: true };
        case HIDE_LOADING_PAGE:
            return { isVisible: false };
        default:
            return state;
    }
};
