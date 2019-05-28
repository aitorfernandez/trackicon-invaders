import React, { Component } from 'react';

import { getIdenticonCode } from './../../utils';
import { GenreSelect } from './../genre';
import P5Wrapper from './P5Wrapper';
import sketch from './sketch';

import './p5.css';

function getInitialState() {
  return {
    identicons: {
      invaders: { },
      defender: { },
    },
    sketch: sketch
  };
}

class P5 extends Component{
  constructor(props) {
    super(props);
    this.state = getInitialState();
  }

  setIdenticos(identicons) {
    let invaders = [];

    for (let invader of identicons.invaders) {
      invaders.push({
        icon: getIdenticonCode(invader.name),
        previewUrl: invader.previewUrl
      });
    }

    this.setState({
      identicons: {
        invaders,
        defender: {
          icon: getIdenticonCode(identicons.defender)
        }
      }
    });
  }

  render() {
    return (
      <div>
        <div className="p5__select">
          <GenreSelect setIdenticos={this.setIdenticos.bind(this)} />
        </div>
        <div className="p5__canvas">
          <P5Wrapper sketch={this.state.sketch} identicons={this.state.identicons} />
        </div>
      </div>
    );
  }
}

export default P5;
