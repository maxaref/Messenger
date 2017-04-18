import React from 'react';
import UserPanel from '../containers/UserPanel';

export default function PageWrapper(props) {
  return (
    <div>
      <UserPanel />
      <div>{props.children}</div>
    </div>
  );
}
