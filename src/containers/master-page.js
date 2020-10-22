// @packages
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// @scripts
import LoadingPage from '../pages/loading-page';
import MasterPage from '../pages/master-page';

import {
    changeQuerySearch,
    changeSearchEngine,
    searchInBingEngine,
    searchInBothEngines,
    searchInGoogleEngine
} from '../redux';

// @constants
const searchEngines = [{
    description: 'Google',
    id: 'google',
    name: 'google',
    value: 'google'
}, {
    description: 'Bing',
    id: 'bing',
    name: 'bing',
    value: 'bing'
}, {
    description: 'Both',
    id: 'both',
    name: 'both',
    value: 'both'
}];

const MasterPageContainer = ({
    bingSearchResults,
    bingSearchTotalResults,
    googleSearchResults,
    googleSearchTotalResults,
    isLoadingVisible,
    onChangeQuerySearch,
    onChangeSearchEngine,
    onSearchInBingEngine,
    onSearchInBothEngines,
    onSearchInGoogleEngine,
    queryValue,
    selectedEngine
}) => (
    <>
        <Helmet>
            <title>Synack web search engine</title>
        </Helmet>
        <LoadingPage
            id="loading-page"
            visible={isLoadingVisible}
        />
        <MasterPage
            bingSearchResults={bingSearchResults}
            bingSearchTotalResults={bingSearchTotalResults}
            googleSearchResults={googleSearchResults}
            googleSearchTotalResults={googleSearchTotalResults}
            id="master-page"
            onChangeQuerySearch={onChangeQuerySearch}
            onChangeSearchEngine={onChangeSearchEngine}
            onSearchInBingEngine={onSearchInBingEngine}
            onSearchInBothEngines={onSearchInBothEngines}
            onSearchInGoogleEngine={onSearchInGoogleEngine}
            queryValue={queryValue}
            searchEngines={searchEngines}
            selectedEngine={selectedEngine}
        />
    </>
);

MasterPageContainer.propTypes = {
    bingSearchResults: PropTypes.arrayOf(PropTypes.shape({
        description: PropTypes.string,
        title: PropTypes.string,
        link: PropTypes.string
    })),
    bingSearchTotalResults: PropTypes.string,
    googleSearchResults: PropTypes.arrayOf(PropTypes.shape({
        description: PropTypes.string,
        title: PropTypes.string,
        link: PropTypes.string,
        thumbnail: PropTypes.string
    })),
    googleSearchTotalResults: PropTypes.string,
    isLoadingVisible: PropTypes.bool.isRequired,
    onChangeQuerySearch: PropTypes.func.isRequired,
    onChangeSearchEngine: PropTypes.func.isRequired,
    onSearchInBingEngine: PropTypes.func.isRequired,
    onSearchInBothEngines: PropTypes.func.isRequired,
    onSearchInGoogleEngine: PropTypes.func.isRequired,
    queryValue: PropTypes.string,
    selectedEngine: PropTypes.string
};

MasterPageContainer.defaultProps = {
    bingSearchResults: [],
    bingSearchTotalResults: '',
    googleSearchResults: [],
    googleSearchTotalResults: [],
    queryValue: '',
    selectedEngine: 'both'
};

const mapStateToProps = ({ loading, search }) => ({
    bingSearchResults: search.bingEngineResult.items,
    bingSearchTotalResults: search.bingEngineResult.total,
    googleSearchResults: search.googleEngineResult.items,
    googleSearchTotalResults: search.googleEngineResult.total,
    isLoadingVisible: loading.isVisible,
    queryValue: search.query,
    selectedEngine: search.selectedEngine
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    onChangeQuerySearch: changeQuerySearch,
    onChangeSearchEngine: changeSearchEngine,
    onSearchInBingEngine: searchInBingEngine,
    onSearchInBothEngines: searchInBothEngines,
    onSearchInGoogleEngine: searchInGoogleEngine
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MasterPageContainer);
