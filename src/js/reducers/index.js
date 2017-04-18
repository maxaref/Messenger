import { combineReducers } from 'redux';
import user from './user';
import messages from './messages';
import actionMessages from './actionMessages';

export default combineReducers({ user, messages, action_messages: actionMessages });
