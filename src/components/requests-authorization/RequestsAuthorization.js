import React, { Component } from 'react';

import spotifyClient from './../../spotifyClient';

import './RequestsAuthorization.css';

class RequestsAuthorization extends Component {

  onClick(event) {
    event.preventDefault();

    spotifyClient.login().then((url) => {
      window.location.href = url;
    });
  }

  render() {
    return (
      <div>
        <div className="requests-authorization__btn">
          <a href="#" className="btn btn--fill" onClick={this.onClick.bind(this)}>
            Authorization & Play
          </a>
        </div>
        <div className="requests-authorization__showcase">
          <img src={require('./invaders.png')} alt="" />
        </div>
      </div>
    );
  }
}

export default RequestsAuthorization;
