import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';

import store from './store';
import checkAuth from './containers/checkAuth';
import PageWrapper from './components/PageWrapper';
import Messages from './containers/Messages';
import UserSettings from './containers/UserSettings';
import Auth from './containers/Auth';
import Register from './containers/Register';
import { getUser } from './actions/user';

const getUserAction = bindActionCreators(getUser, store.dispatch.bind(store));

getUserAction(() => {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/">
          <Route component={checkAuth(PageWrapper)}>
            <IndexRoute component={Messages} />
            <Route path="settings" component={UserSettings} />
          </Route>
          <Route component={checkAuth(null, true)} >
            <Route path="auth" component={Auth} />
            <Route path="register" component={Register} />
          </Route>
        </Route>
      </Router>
    </Provider>,
    document.getElementById('app')
  );
});
