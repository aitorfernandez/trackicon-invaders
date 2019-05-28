import React, { Component } from 'react';

import './CallbackError.css';

class CallbackError extends Component {
  render() {
    return (
      <div className="callback-error">
        <p className="callback-error__info">
        {
          this.props.e
        }
        </p>
      </div>
    );
  }
}

export default CallbackError;
