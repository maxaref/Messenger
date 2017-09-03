import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

export default class Auth extends Component {
  sendForm(e) {
    e.preventDefault();

    const email = this.email.value.trim();
    const password = this.password.value.trim();

    this.props.authActions.auth(email, password);
  }

  showAuthMessage() {
    const message = this.props.user.auth_message;

    if (!message) return null;
    return <div className="alert alert-danger">{message}</div>;
  }

  render() {
    return (
      <div className="auth-wrap">
        {this.showAuthMessage()}
        <div className="panel panel-default">
          <div className="panel-heading">Auth</div>
          <div className="panel-body">
            <form onSubmit={(e) => this.sendForm(e)} >
              <div className="form-group">
                <input
                  ref={(input) => (this.email = input)}
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  ref={(input) => (this.password = input)}
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  required
                />
              </div>

              <Link
                to="/register/"
                className="register-btn pull-left auth-link-btn"
              >Register new user?</Link>
              <button type="submit" className="btn btn-default pull-right">Log in</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Auth.propTypes = {
  authActions: PropTypes.shape({
    auth: PropTypes.func.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    auth_message: PropTypes.string,
  }).isRequired,
};
