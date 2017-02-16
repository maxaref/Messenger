'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as routerActions from '../actions/router';

export default function(RenderedComponent) {
    class CheckAuth extends Component {
        componentWillMount() {
            this.chackAuth(this.props.user.data);
        }

        componentWillReceiveProps(nextProps) {
            this.chackAuth(nextProps.user.data);
        }

        chackAuth(user) {
            this.setState({ user }, () => {
                if(!this.state.user) this.props.routerActions.replace('/auth/');
            });
        }

        render() {
            if(this.state.user) return <RenderedComponent />;
            else                return null;
        }
    }

    function mapStateToProps({ user }) {
        return { user };
    }

    function mapActionsToProps(dispatch) {
        return {
            routerActions: bindActionCreators(routerActions, dispatch)
        };
    }

    return connect(mapStateToProps, mapActionsToProps)(CheckAuth);
}
