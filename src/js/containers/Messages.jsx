import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as routerActions from '../actions/router';
import * as messagesActions from '../actions/messages';

import Messages from '../components/Messages/index';

const mapStateToProps = ({ messages, user }) => ({ messages, user });

const mapActionsToProps = dispatch => ({
  routerActions: bindActionCreators(routerActions, dispatch),
  messagesActions: bindActionCreators(messagesActions, dispatch),
});

export default connect(mapStateToProps, mapActionsToProps)(Messages);
