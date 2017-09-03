import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as routerActions from '../actions/router';
import * as userActions from '../actions/user';

import UserPanel from '../components/UserPanel';

const mapStateToProps = ({ user }) => ({ user });

const mapActionsToProps = dispatch => ({
  routerActions: bindActionCreators(routerActions, dispatch),
  userActions: bindActionCreators(userActions, dispatch),
});

export default connect(mapStateToProps, mapActionsToProps)(UserPanel);
