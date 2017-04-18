import React, { Component } from 'react';
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
          <div className="panel-heading">Messages in { user.location }</div>
          <div className="panel-body messages-wrap" ref={(el) => { this.wrapper = el; }}>
            {this.props.messages.map(message => <Message key={message._id} {...message} /> )}
          </div>
        </div>

        <Add addMessage={this.props.messagesActions.add} />
      </div>
    );
  }
}
