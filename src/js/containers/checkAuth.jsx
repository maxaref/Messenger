import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as routerActions from '../actions/router';

export default function (RenderedComponent, needLogoutUser = false) {
  class CheckAuth extends Component {
    componentWillMount() {
      this.chackAuth(this.props.user.data);
    }

    componentWillReceiveProps(nextProps) {
      this.chackAuth(nextProps.user.data);
    }

    chackAuth(user) {
      this.setState({ user }, () => {
        if (this.state.user && needLogoutUser) this.props.routerActions.replace('/');
        if (!this.state.user && !needLogoutUser) this.props.routerActions.replace('/auth/');
      });
    }

    render() {
      const isRedirect = (this.state.user && needLogoutUser)
                      || (!this.state.user && !needLogoutUser);

      if (isRedirect) return null;

      if (RenderedComponent) return <RenderedComponent>{ this.props.children }</RenderedComponent>;
      return <div>{ this.props.children }</div>;
    }
  }

  function mapStateToProps({ user }) {
    return { user };
  }

  function mapActionsToProps(dispatch) {
    return {
      routerActions: bindActionCreators(routerActions, dispatch),
    };
  }

  return connect(mapStateToProps, mapActionsToProps)(CheckAuth);
}
