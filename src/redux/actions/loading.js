// @constants
export const HIDE_LOADING_PAGE = 'HIDE_LOADING_PAGE';
export const SHOW_LOADING_PAGE = 'SHOW_LOADING_PAGE';

export const showLoadingPage = () => ({
    type: SHOW_LOADING_PAGE
});

export const hideLoadingPage = () => ({
    type: HIDE_LOADING_PAGE
});
