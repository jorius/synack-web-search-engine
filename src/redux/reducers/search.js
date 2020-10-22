// @packages
import { combineReducers } from 'redux';
import numeral from 'numeral';

// @scripts
import initialState from '../state';
import {
    CHANGE_QUERY_SEARCH,
    CHANGE_SEARCH_ENGINE,
    SEARCH_IN_BING_ENGINE,
    SEARCH_IN_GOOGLE_ENGINE
} from '../actions';

/**
 * @returns {string}
 */
export const queryReducer = (
    state = initialState.search.query, action
) => {
    switch (action.type) {
        case CHANGE_QUERY_SEARCH:
            return action.payload;
        default:
            return state;
    }
};

/**
 * @returns {{
 * news: {
 *   description: string,
 *   link: string,
 *   thumbnail: string,
 *   title: string
 * }[]
 * totalItems: string,
 * webPages: {
 *   description: string,
 *   link: string,
 *   thumbnail: string,
 *   title: string
 * }[]
 * }}
*/
export const bingEngineResultReducer = (
    state = initialState.search.bingEngineResult, action
) => {
    switch (action.type) {
        case SEARCH_IN_BING_ENGINE:
            const { webPages } = action.payload;
            const newItems = webPages?.value?.map((n) => ({
                description: n.snippet,
                link: n.url,
                title: n.name
            })) || [];

            return {
                ...state,
                items: newItems,
                total: numeral(webPages?.totalEstimatedMatches).format('0,0')
            };
        default:
            return state;
    }
};

/**
 * @returns {{
 * items: {
 *   description: string,
 *   link: string,
 *   thumbnail: string,
 *   title: string
 * }[]
 * totalItems: string
 * }}
*/
export const googleEngineResultReducer = (
    state = initialState.search.googleEngineResult, action
) => {
    switch (action.type) {
        case SEARCH_IN_GOOGLE_ENGINE:
            const { searchInformation, items } = action.payload || {};
            const newItems = items?.map((item) => ({
                description: item.snippet,
                link: item.link,
                thumbnail: item.pagemap.cse_thumbnail?.shift()?.src || item.pagemap.cse_image?.shift()?.src,
                title: item.title
            })) || [];

            return {
                ...state,
                items: newItems,
                total: numeral(searchInformation?.formattedTotalResults).format('0,0')
            };
        default:
            return state;
    }
};

/**
 * @returns {string}
 */
export const selectedEngineReducer = (
    state = initialState.search.selectedEngine, action
) => {
    switch (action.type) {
        case CHANGE_SEARCH_ENGINE:
            return action.payload;
        default:
            return state;
    }
};

export const searchReducer = combineReducers({
    bingEngineResult: bingEngineResultReducer,
    googleEngineResult: googleEngineResultReducer,
    query: queryReducer,
    selectedEngine: selectedEngineReducer
});
