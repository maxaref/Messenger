'use strict';

import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../styles/main.less';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import store from './store';

import checkAuth from './containers/checkAuth.jsx';
import UserPanel from './containers/UserPanel.jsx';
import Messages from './containers/Messages.jsx';
import UserSettings from './containers/UserSettings.jsx';
import Auth from './containers/Auth.jsx';
import Register from './containers/Register.jsx';

ReactDOM.render(
    <Provider store={ store }>
        <Router history={ browserHistory }>
            <Route path="/">
                <Route component={ checkAuth(UserPanel) }>
                    <IndexRoute component={ Messages }/>
                    <Route path="settings" component={ UserSettings }/>
                </Route>
                <Route path="auth" component={ Auth } />
                <Route path="register" component={ Register } />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);
