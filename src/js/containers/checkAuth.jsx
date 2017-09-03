import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as routerActions from '../actions/router';

export default function (RenderedComponent, needLogoutUser = false) {
  class CheckAuth extends Component {
    componentWillMount() {
      this.checkAuth(this.props.user.data);
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth(nextProps.user.data);
    }

    checkAuth(user) {
      this.setState({ user }, () => {
        if (this.state.user && needLogoutUser) this.props.routerActions.replace('/');
        if (!this.state.user && !needLogoutUser) this.props.routerActions.replace('/auth/');
      });
    }

    render() {
      const isRedirect = (this.state.user && needLogoutUser)
                      || (!this.state.user && !needLogoutUser);

      if (isRedirect) return null;

      if (RenderedComponent) return <RenderedComponent>{this.props.children}</RenderedComponent>;
      return <div>{this.props.children}</div>;
    }
  }

  CheckAuth.propTypes = {
    user: PropTypes.shape({
      data: PropTypes.object.isRequired,
    }),
    routerActions: PropTypes.shape({
      replace: PropTypes.func.isRequired,
    }).isRequired,
    children: PropTypes.node.isRequired,
  };

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

