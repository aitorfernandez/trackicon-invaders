import React, { Component } from 'react';

import spotifyClient from './spotifyClient';
import { getParams } from './utils';
import Header from './components/header';
import Footer from './components/footer';
import RequestsAuthorization from './components/requests-authorization';
import P5 from './components/p5';
import CallbackError from './components/callback-error';

import './App.css';

function getInitialState() {
  return {
    hashParams: getParams(window.location.hash),
    searchParams: getParams(window.location.search)
  };
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = getInitialState();
  }

  loggedIn() {
    if (this.state.searchParams.error) {
      return <CallbackError e={this.state.searchParams.error} />;
    }

    if (Object.keys(this.state.hashParams).length === 0) {
      return <RequestsAuthorization />;
    }
    else {
      spotifyClient.token = this.state.hashParams.access_token;
      return <P5 />;
    }
  }

  render() {
    const isLoggedIn = this.loggedIn();

    return (
      <div className="app">
        <Header />
        {
          isLoggedIn
        }
        <Footer />
      </div>
    );
  }
}

export default App;
