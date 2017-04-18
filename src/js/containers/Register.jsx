import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as routerActions from '../actions/router';
import * as authActions from '../actions/user';

import Register from '../components/Register';

function mapStateToProps({ user }) {
  return { user };
}

function mapActionsToProps(dispatch) {
  return {
    routerActions: bindActionCreators(routerActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch),
  };
}

export default connect(mapStateToProps, mapActionsToProps)(Register);
