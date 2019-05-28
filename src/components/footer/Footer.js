import React, { Component } from 'react';

import './Footer.css';

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="footer__nav">
          <p>
            Made with fun ＼(＾▽＾)／
          </p>
          <nav>
            <a href="http://aitorfernandez.com" target="_blank" title="Personal portfolio">
            aitorfernandez.com
            </a>
            <a href="https://twitter.com/aitorfernandez" target="_blank" title="Follow me on Twitter">
            Twitter
            </a>
            <a href="https://github.com/aitorfernandez" target="_blank" title="See more projects on Github">
            Github
            </a>
          </nav>
        </div>
      </footer>
    );
  }
}

export default Footer;
