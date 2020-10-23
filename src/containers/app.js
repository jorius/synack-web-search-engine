// @packages
import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

// @scripts
import MasterPageContainer from './master-page';
import { initializeReduxStore } from '../redux/store';

// @constants
const materialUITheme = createMuiTheme({});
const reduxStore = initializeReduxStore();

const AppContainer = () => (
    <MuiThemeProvider theme={materialUITheme}>
        <CssBaseline />
        <ReduxProvider store={reduxStore}>
            <HashRouter>
                <Route component={MasterPageContainer} />
            </HashRouter>
        </ReduxProvider>
    </MuiThemeProvider>
);

export default AppContainer;
