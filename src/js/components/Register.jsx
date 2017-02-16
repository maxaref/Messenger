'use strict';

import React, { Component } from 'react';
import {Link} from 'react-router';

export default class Register extends Component {

    sendForm(e) {
        e.preventDefault();

        if(!this.checkConfirmPassword()) return;

        var data = {
            email: this.email.value.trim(),
            name: this.name.value,
            password: this.password.value.trim()
        };

        this.props.authActions.register(data);
    }

    showRegisterMessage() {
        var message = this.props.user.register_message;

        if(!message) return null;
        return <div className="alert alert-danger">{ message }</div>;
    }

    checkConfirmPassword() {
        var isTheSame = this.password.value == this.confirm_password.value
                        && this.password.value.length > 5;

        this.confirm_password.setCustomValidity(isTheSame ? '' : 'Wrong password confirm.');
        return isTheSame;
    }

    render() {
        return <div className="register-wrap">
            { this.showRegisterMessage() }
            <div className="panel panel-default">
            	<div className="panel-heading">Registration</div>
            	<div className="panel-body">
                    <form onSubmit={ (e) => this.sendForm(e) } >
                        <div className="form-group">
                            <input
                                ref={ input => { this.name = input; } }
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                required
                            />
                    	</div>
                    	<div className="form-group">
                    		<input
                                ref={ input => { this.email = input; } }
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                required
                            />
                    	</div>
                        <hr />
                        <div className="form-group">
                            <span className="password-rules">Password must be at least 6 characters.</span>
                        </div>
                    	<div className="form-group">
                    		<input
                                ref={ input => { this.password = input; } }
                                type="password"
                                className="form-control"
                                minLength="6"
                                maxLength="15"
                                onChange={ () => this.checkConfirmPassword() }
                                placeholder="Password"
                            />
                    	</div>
                        <div className="form-group">
                    		<input
                                ref={ input => { this.confirm_password = input; } }
                                type="password"
                                className="form-control"
                                minLength="6"
                                maxLength="15"
                                onChange={ () => this.checkConfirmPassword() }
                                placeholder="Confirm password"
                            />
                    	</div>

                        <hr />
                        <Link to="/auth/" className="auth-link-btn pull-left">Turn back to authorization?</Link>
                        <button type="submit" className="btn btn-default pull-right">Send</button>
                    </form>
            	</div>
            </div>
        </div>;
    }
}
