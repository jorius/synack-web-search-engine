// @packages
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import CtrlSearchEngineResult from '../../components/ctrl-search-engine-result';
import CtrlToastNotification from '../../components/ctrl-toast-notification';

// @styles
import styles from './styles';

const MasterPage = ({
    bingSearchResults,
    bingSearchTotalResults,
    classes,
    googleSearchResults,
    googleSearchTotalResults,
    id,
    onChangeQuerySearch,
    onChangeSearchEngine,
    onSearchInBingEngine,
    onSearchInBothEngines,
    onSearchInGoogleEngine,
    queryValue,
    searchEngines,
    selectedEngine
}) => {
    const [showErrors, toggleErrors] = useState(false);
    const [showToast, toggleToast] = useState(false);
    const [toastMsg, setToastMsg] = useState('');
    const [toastSeverity, setToastSeverity] = useState('');

    const hasBingResults = Boolean(bingSearchResults.length);
    const hasGoogleResults = Boolean(googleSearchResults.length);

    const handleToggleToast = (msg, severity) => {
        if (msg) {
            setToastMsg(msg);
        }

        if (severity) {
            setToastSeverity(severity);
        }

        toggleToast(!showToast);
    };

    const handleOnSearch = () => {
        if (selectedEngine && queryValue) {
            toggleErrors(false);

            switch (selectedEngine) {
                case 'bing':
                    onSearchInBingEngine();
                    break;
                case 'google':
                    onSearchInGoogleEngine();
                    break;
                case 'both':
                default:
                    onSearchInBothEngines();
                    break;
            }
        } else {
            handleToggleToast('Both fields are required!', 'error');
            toggleErrors(true);
        }
    };

    const handleOnFieldChange = ({ target: { value } }) =>
        onChangeQuerySearch(value);

    const handleOnKeyPress = ({ charCode }) => {
        if (charCode === 13) {
            handleOnSearch();
        }
    };

    const handleOnEngineChange = ({ target: { value } }) =>
        onChangeSearchEngine(value);

    const getTotalResults = (engine) => {
        switch (engine) {
            case 'bing':
                return bingSearchTotalResults
                    ? `About ${bingSearchTotalResults} results`
                    : '';
            case 'google':
                return googleSearchTotalResults
                    ? `About ${googleSearchTotalResults} results`
                    : '';
            default:
                return '';
        }
    };

    const getResultContentSize = () => {
        if (hasBingResults && hasGoogleResults) {
            return 5;
        }

        return 8;
    };

    return (
        <div className={classes.masterPage} id={id}>
            <CtrlToastNotification
                className={classes[`${toastSeverity}Toast`]}
                id={`${id}-toast-notification`}
                message={toastMsg}
                onClose={() => handleToggleToast()}
                position={{
                    horizontal: 'right',
                    vertical: 'bottom'
                }}
                visible={showToast}
            />
            <Grid
                container
                direction="row"
                justify="center"
                spacing={2}
            >
                <Grid
                    item
                    lg={5}
                    md={5}
                    sm={12}
                    xs={12}
                >
                    <TextField
                        className={classes.textField}
                        error={showErrors}
                        helperText="e.g: Dogs, Cats, How to exit Vim, etc..."
                        id={`${id}-query-value`}
                        label="Do a search!"
                        onChange={handleOnFieldChange}
                        onKeyPress={handleOnKeyPress}
                        placeholder="Do a search!"
                        required
                        value={queryValue}
                    />
                </Grid>
            </Grid>
            <Grid
                className={classes.searchActions}
                container
                direction="row"
                justify="center"
                spacing={2}
            >
                <Grid
                    item
                    lg={4}
                    md={4}
                    sm={12}
                    xs={12}
                >
                    <TextField
                        className={classes.textField}
                        error={showErrors}
                        helperText="Please select an engine to perform a search."
                        id={`${id}-selected-engine`}
                        label="Select an engine!"
                        onChange={handleOnEngineChange}
                        required
                        select
                        value={selectedEngine}
                    >
                        {searchEngines.map((engine) => (
                            <MenuItem key={engine.id} value={engine.value}>
                                {engine.description}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid
                    className={classes.searchButton}
                    item
                    lg={1}
                    md={1}
                    sm={12}
                    xs={12}
                >
                    <Button
                        color="primary"
                        onClick={handleOnSearch}
                        variant="contained"
                    >
                        Search
                    </Button>
                </Grid>
            </Grid>
            <Divider />
            <Grid
                className={classes.searchResults}
                container
                direction="row"
                justify="center"
                spacing={2}
            >
                <Grid
                    item
                    lg={getResultContentSize()}
                    md={12}
                    sm={12}
                    xs={12}
                >
                    <CtrlSearchEngineResult
                        className={classes.searchEngineContent}
                        id={`${id}-google-result`}
                        results={googleSearchResults}
                        title="Google search"
                        total={getTotalResults('google')}
                        visible={hasGoogleResults}
                    />
                </Grid>
                <Grid
                    item
                    lg={getResultContentSize()}
                    md={12}
                    sm={12}
                    xs={12}
                >
                    <CtrlSearchEngineResult
                        className={classes.searchEngineContent}
                        id={`${id}-bing-result`}
                        results={bingSearchResults}
                        title="Bing search"
                        total={getTotalResults('bing')}
                        visible={hasBingResults}
                    />
                </Grid>
            </Grid>
        </div>
    );
};

MasterPage.propTypes = {
    bingSearchResults: PropTypes.arrayOf(PropTypes.shape({
        description: PropTypes.string,
        title: PropTypes.string,
        link: PropTypes.string
    })),
    bingSearchTotalResults: PropTypes.string,
    classes: PropTypes.object.isRequired,
    googleSearchResults: PropTypes.arrayOf(PropTypes.shape({
        description: PropTypes.string,
        title: PropTypes.string,
        link: PropTypes.string,
        thumbnail: PropTypes.string
    })),
    googleSearchTotalResults: PropTypes.string,
    id: PropTypes.string.isRequired,
    onChangeQuerySearch: PropTypes.func.isRequired,
    onChangeSearchEngine: PropTypes.func.isRequired,
    onSearchInBingEngine: PropTypes.func.isRequired,
    onSearchInBothEngines: PropTypes.func.isRequired,
    onSearchInGoogleEngine: PropTypes.func.isRequired,
    queryValue: PropTypes.string,
    searchEngines: PropTypes.arrayOf(PropTypes.shape({
        description: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
    })).isRequired,
    selectedEngine: PropTypes.string
};

MasterPage.defaultProps = {
    bingSearchResults: [],
    bingSearchTotalResults: '',
    googleSearchResults: [],
    googleSearchTotalResults: [],
    queryValue: '',
    selectedEngine: 'both'
};

export default withStyles(styles)(MasterPage);
