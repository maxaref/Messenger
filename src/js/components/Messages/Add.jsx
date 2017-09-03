import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Add extends Component {
  addMessage(e) {
    e.preventDefault();

    this.props.addMessage(this.text.value);
    this.text.value = '';
    this.text.focus();
  }

  render() {
    return (
      <div>
        <form onSubmit={e => this.addMessage(e)}>
          <textarea
            ref={input => (this.text = input)}
            className="form-control"
            rows="3"
            required
          />
          <br />
          <button type="submit" className="btn btn-primary pull-right">Add</button>
        </form>
      </div>
    );
  }
}

Add.propTypes = {
  addMessage: PropTypes.func.isRequired,
};
