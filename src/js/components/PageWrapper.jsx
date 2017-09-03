import React from 'react';
import PropTypes from 'prop-types';
import UserPanel from '../containers/UserPanel';

const PageWrapper = props => (
  <div>
    <UserPanel />
    <div>{props.children}</div>
  </div>
);

PageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
