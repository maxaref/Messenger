import React from 'react';

export default function Message(props) {
  const date = new Date(props.date);
  const formatTime = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();

  return (
    <div className="message">
      <span className="author">{props.user.name}</span>
      <span className="date">({formatTime})</span>
      <div className="text">{props.message}</div>
    </div>
  );
}
