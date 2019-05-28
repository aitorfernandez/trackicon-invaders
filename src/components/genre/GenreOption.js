import React, { Component } from 'react';

class GenreOption extends Component {
  render() {
    const { id, name } = this.props.genre;

    return (
      <option value={id}>
        {name}
      </option>
    );
  }
}

export default GenreOption;
