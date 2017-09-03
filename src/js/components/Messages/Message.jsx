import React from 'react';
import PropTypes from 'prop-types';

const Message = props => {
  const date = new Date(props.date);
  const formatTime = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

  return (
    <div className="message">
      <span className="author">{props.user.name}</span>
      <span className="date">({formatTime})</span>
      <div className="text">{props.message}</div>
    </div>
  );
};

Message.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.atring.isRequired,
  }).isRequired,
  date: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default Message;
