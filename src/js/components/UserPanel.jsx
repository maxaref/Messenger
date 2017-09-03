import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router';

export default class UserPanel extends Component {

  logOut() {
    this.props.userActions.logOut();
  }

  render() {
    return (
      <div className="panel panel-default user-panel-wrap">
        <div className="panel-body">
          <Link to="/settings/" className="pull-left" >{this.props.user.data.name} [Settings]</Link>
          <a
            href="javescript:void(0);"
            className="pull-right"
            onClick={() => this.logOut()}
          >Logout</a>
        </div>
      </div>
    );
  }
}

UserPanel.propTypes = {
  userActions: PropTypes.shape({
    logOut: PropTypes.func.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    data: PropTypes.object,
  }).isRequired,
};
