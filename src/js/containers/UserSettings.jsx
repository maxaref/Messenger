import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as routerActions from '../actions/router';
import * as userActions from '../actions/user';

import UserSettings from '../components/UserSettings';

function mapStateToProps({ user, action_messages }) {
  return { user, action_messages };
}

function mapActionsToProps(dispatch) {
  return {
    routerActions: bindActionCreators(routerActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch),
  };
}

export default connect(mapStateToProps, mapActionsToProps)(UserSettings);
