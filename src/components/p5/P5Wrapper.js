// https://discuss.reactjs.org/t/using-react-with-p5-js/5565

import React, { Component } from 'react';
import p5 from 'p5';

class P5Wrapper extends Component {
  componentDidMount() {
    this.canvas = new p5(this.props.sketch, this.refs.wrapper);
    this.canvas.myCustomRedrawAccordingToNewPropsHandler(this.props);
  }

  componentWillReceiveProps(newProps) {
    if (this.canvas.myCustomRedrawAccordingToNewPropsHandler) {
      this.canvas.myCustomRedrawAccordingToNewPropsHandler(newProps);
    }
  }

  render() {
    return (
      <div ref="wrapper"></div>
    );
  }
}

export default P5Wrapper;
