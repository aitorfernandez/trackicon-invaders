import React, { Component } from 'react';

import './Header.css';

class Header extends Component {
  render() {
    return (
      <div className="header">
        <header>
          <h1 className="header__title">Trackicon Invaders</h1>
          <p className="header__subtitle-info header__info">
            Trackicon Invaders translates your favourite genre into Space Invaders game transforming each song in a
            <a href="https://en.wikipedia.org/wiki/Identicon" target="_blank" title="Identicon - Wikipedia">
              Identicon / Invader
            </a>
            as a grid of 5x5. When the
            <a href="https://en.wikipedia.org/wiki/Identicon" target="_blank" title="Identicon - Wikipedia">
              Identicon / Invader
            </a>
            is destroyed a 30 seconds preview of the song is played.
          </p>
          <p className="header__subtitle-how-to-play header__info">
            Use the the left and right arrows on your keyboard to move the defender icon and the space bar to shoot. Enjoy!
          </p>
          <p className="header__info">
            In order to play, you need to sign in with your spotify account.
          </p>
          <p className="header__subtitle-source header__info">
            More information and source code on
            <a href="https://github.com/aitorfernandez/trackicon-invaders" target="_blank" title="Source Code on Github">
              Github.
            </a>
          </p>
        </header>
      </div>
    );
  }
}

export default Header;
