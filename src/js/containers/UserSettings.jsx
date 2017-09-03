import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as routerActions from '../actions/router';
import * as userActions from '../actions/user';

import UserSettings from '../components/UserSettings';

const mapStateToProps = ({ user, action_messages }) => ({ user, action_messages });

const mapActionsToProps = dispatch => ({
  routerActions: bindActionCreators(routerActions, dispatch),
  userActions: bindActionCreators(userActions, dispatch),
});

export default connect(mapStateToProps, mapActionsToProps)(UserSettings);
