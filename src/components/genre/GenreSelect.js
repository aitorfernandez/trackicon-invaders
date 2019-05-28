import React, { Component } from 'react';

import browseAPI from './../../spotify-web-api/browseAPI.js';
import GenreOption from './GenreOption.js';

import './genre.css';

function getInitialState() {
  return {
    genres: [
      // Testing...
      // {
      //   id: 'rnb',
      //   name: 'RnB'
      // },
      // {
      //   id: 'mood',
      //   name: 'Mood'
      // },
      // {
      //   id: 'metal',
      //   name: 'Metal'
      // }
    ]
  };
}

class GenreSelect extends Component {
  constructor(props) {
    super(props);
    this.state = getInitialState();
  }

  componentDidMount() {
    browseAPI.getAvailableGenreSeeds().then((genres) => {
      this.setState({
        genres: genres || []
      });
    });
  }

  onChange(event) {

    // Testing....
    // let temp = [];
    // let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    //
    // for (let i = 0; i < 100; i++) {
    //   let text = '';
    //
    //   for (var j = 0; j < 10; j++) {
    //     text += possible.charAt(Math.floor(Math.random() * possible.length));
    //   }
    //
    //   temp.push({
    //     name: text,
    //     previewUrl: text
    //   });
    // }
    //
    // this.props.setIdenticos({
    //   invaders: temp,
    //   defender: event.target.value
    // });

    const genre = event.target.value;

    browseAPI.getRecommendations(genre).then((tracks) => {
      this.props.setIdenticos({
        invaders: tracks,
        defender: genre
      });
    });
  }

  createGenreOption(genre, key) {
    return <GenreOption key={key.toString()} genre={genre} />
  }

  render() {
    return (
      <div className="genre">
        <select onChange={this.onChange.bind(this)}>
          <option value="select">Select</option>
          {this.state.genres.map(this.createGenreOption)}
        </select>
      </div>
    );
  }
}

export default GenreSelect;
