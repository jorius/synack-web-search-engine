/* eslint-disable max-len */

// @packages
import axios from 'axios';
import { WebSearchClient } from '@azure/cognitiveservices-websearch';
import { CognitiveServicesCredentials } from '@azure/ms-rest-azure-js';

// @constants
export const CHANGE_QUERY_SEARCH = 'CHANGE_QUERY_SEARCH';
export const CHANGE_SEARCH_ENGINE = 'CHANGE_SEARCH_ENGINE';
export const SEARCH_IN_BING_ENGINE = 'SEARCH_IN_BING_ENGINE';
export const SEARCH_IN_GOOGLE_ENGINE = 'SEARCH_IN_GOOGLE_ENGINE';

// @Bing search API initialization and configuration
const bingSearchEngineApiKey = process.env.REACT_APP_BING_SEARCH_ENGINE_API_KEY;
const bingApiCredentiales = new CognitiveServicesCredentials(bingSearchEngineApiKey);
const bingWebSearchApiClient = new WebSearchClient(bingApiCredentiales);

// @Google search API initialization and configuration
const googleSearchEngineId = process.env.REACT_APP_GOOGLE_SEARCH_ENGINE_ID;
const googleSearchEngineApiKey = process.env.REACT_APP_GOOGLE_SEARCH_ENGINE_API_KEY;
const googleSearchEngineEndPoint = `https://www.googleapis.com/customsearch/v1?key=${googleSearchEngineApiKey}&cx=${googleSearchEngineId}`;

/**
 * @param {string} query - The query to do the web search.
 */
export const changeQuerySearch = (query) =>
    ({
        type: CHANGE_QUERY_SEARCH,
        payload: query
    });

/**
 * @param {string} engine - The engine where to search the query, e.g: 'google', 'bing', 'both'.
 */
export const changeSearchEngine = (engine) =>
    ({
        type: CHANGE_SEARCH_ENGINE,
        payload: engine
    });

export const searchInBingEngine = () => (dispatch, getState) =>
    new Promise((resolve, reject) => {
        const { query } = getState().search;
        bingWebSearchApiClient.web.search(query).then((response) => {
            dispatch({
                type: SEARCH_IN_BING_ENGINE,
                payload: response
            });
            resolve(response);
        }).catch((error) => reject(error));
    });

export const searchInGoogleEngine = () => (dispatch, getState) => axios
    .get(`${googleSearchEngineEndPoint}&q=${getState().search.query}`)
    .then((response) => {
        dispatch({
            type: SEARCH_IN_GOOGLE_ENGINE,
            payload: response
        });
    })
    .catch((error) => Promise.reject(error));

export const searchInBothEngines = () => (dispatch) =>
    new Promise((resolve) => {
        dispatch(searchInBingEngine());
        dispatch(searchInGoogleEngine());
        resolve();
    });
