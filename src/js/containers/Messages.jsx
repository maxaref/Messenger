import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as routerActions from '../actions/router';
import * as messagesActions from '../actions/messages';

import Messages from '../components/Messages/index';

function mapStateToProps({ messages, user }) {
  return { messages, user };
}

function mapActionsToProps(dispatch) {
  return {
    routerActions: bindActionCreators(routerActions, dispatch),
    messagesActions: bindActionCreators(messagesActions, dispatch),
  };
}

export default connect(mapStateToProps, mapActionsToProps)(Messages);
