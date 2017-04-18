import React, { Component } from 'react';
import { Link } from 'react-router';
import locations from '../../../config/locations';

export default class UserSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  sendForm(e) {
    e.preventDefault();

    if (!this.checkConfirmPassword()) return;

    const data = {
      email: this.email.value.trim(),
      name: this.name.value,
      location: this.location.value,
      password: this.password.value.trim(),
    };

    this.props.userActions.change(data);
  }

  showRegisterMessage() {
    const message = this.props.user.register_message;

    if (!message) return null;
    return <div className="alert alert-danger">{ message }</div>;
  }

  checkConfirmPassword() {
    const isTheSame = this.password.value === this.confirm_password.value;

    this.confirm_password.setCustomValidity(isTheSame ? '' : 'Wrong password confirm.');
    return isTheSame;
  }

  showChangeMessage() {
    if (!this.props.action_messages.message) return null;

    return (
      <div className={'alert alert-' + this.props.action_messages.type} >
        {this.props.action_messages.message}
      </div>
    );
  }

  render() {
    const user = this.props.user.data;

    return (
      <div className="settings-wrap">
        <h1>Settings</h1>
        {this.showChangeMessage()}
        <form onSubmit={(e) => { this.sendForm(e); }} >
          <div className="form-group">
            <input
              ref={(input) => { this.name = input; }}
              type="text"
              className="form-control"
              placeholder="Name"
              defaultValue={user.name}
              required
            />
          </div>
          <div className="form-group">
            <input
              ref={(input) => { this.email = input; }}
              type="email"
              className="form-control"
              placeholder="Email"
              defaultValue={user.email}
              required
            />
          </div>
          <div className="form-group">
            <select
              defaultValue={user.location}
              ref={(input) => { this.location = input; }}
              className="form-control"
            >
              {locations.map(location =>
                (<option key={location} value={location}>{location}</option>))}
            </select>
          </div>
          <hr />
          <div className="form-group">
            <span className="password-rules">Password must be at least 6 characters.</span>
          </div>
          <div className="form-group">
            <input
              ref={(input) => { this.password = input; }}
              type="password"
              className="form-control"
              minLength="6"
              maxLength="15"
              onChange={() => this.checkConfirmPassword()}
              placeholder="Password"
            />
          </div>
          <div className="form-group">
            <input
              ref={(input) => { this.confirm_password = input; }}
              type="password"
              className="form-control"
              minLength="6"
              maxLength="15"
              onChange={() => this.checkConfirmPassword()}
              placeholder="Confirm password"
            />
          </div>

          <button type="submit" className="btn btn-default pull-right">Save</button>
        </form>

        <p>
          <Link to="/" >Back to messages</Link>
        </p>
      </div>
    );
  }
}
