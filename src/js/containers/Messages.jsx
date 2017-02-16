'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as routerActions from '../actions/router';
import * as userActions from '../actions/user';

import Register from '../components/Register.jsx';

function mapStateToProps({ user, messages }) {
    return { user, messages };
}

function mapActionsToProps(dispatch) {
    return {
        routerActions: bindActionCreators(routerActions, dispatch),
        userActions: bindActionCreators(userActions, dispatch)
    };
}

export default connect(mapStateToProps, mapActionsToProps)(Register);
