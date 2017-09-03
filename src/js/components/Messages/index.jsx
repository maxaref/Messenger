import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Add from './Add';
import Message from './Message';

export default class MyComponent extends Component {
  componentDidMount() {
    this.props.messagesActions.getMessages();
  }

  componentDidUpdate() {
    this.wrapper.scrollTop = this.wrapper.scrollHeight;
  }

  render() {
    const user = this.props.user.data;
    return (
      <div>
        <div className="panel panel-default">
          <div className="panel-heading">Messages in {user.location}</div>
          <div className="panel-body messages-wrap" ref={el => (this.wrapper = el)}>
            {this.props.messages.map(message => <Message key={message._id} {...message} /> )}
          </div>
        </div>

        <Add addMessage={this.props.messagesActions.add} />
      </div>
    );
  }
}

MyComponent.propTypes = {
  messagesActions: PropTypes.shape({
    getMessages: PropTypes.func.isRequired,
    add: PropTypes.func.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    data: PropTypes.object,
  }).isRequired,
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.number,
      user: PropTypes.shape({
        name: PropTypes.atring.isRequired,
      }).isRequired,
      date: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
    })
  ),
};