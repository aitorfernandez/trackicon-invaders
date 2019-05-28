import request from 'request-promise';

import spotifyConfig from './spotifyConfig';
// import { generateRandomString } from './utils';
import { GenresHandler, RecommendationsHandler } from './handlers';

class SpotifyClient {

  constructor(config) {
    this.clientId = config.clientId;
    this.clientSecret = config.clientSecret;
    this.stateKey = config.stateKey;
    this.redirectUri = config.redirectUri;

    this.authorizeEndpoint = 'https://accounts.spotify.com/en/authorize';
    this.baseURL = 'https://api.spotify.com/v1';

    this.accessToken = null;
  }

  set token(value) {
    this.accessToken = value;
  }

  get token() {
    return this.accessToken;
  }

  login() {
    // const state = generateRandomString(16);

    // TODO : Update this...
    // localStorage.setItem(this.stateKey, state);

    let url = this.authorizeEndpoint;
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(this.clientId);
    // url += (this.scope ? '&scope=' + encodeURIComponent(this.scope) : '');
    url += '&redirect_uri=' + encodeURIComponent(this.redirectUri);
    // url += '&state=' + encodeURIComponent(state);

    return new Promise((resolve) => {
      resolve(url);
    });
  }

  endpoint(endPoint, method) {
    let options = {
      method,
      url: `${ this.baseURL }/${ endPoint }`,
      headers: {
        'Authorization': `Bearer ${ this.accessToken }`
      },
      json: true
    }

    return request(options)
      .then(body => {
        if (body.genres) {
          return GenresHandler(body.genres);
        }

        if (body.tracks) {
          return RecommendationsHandler(body.tracks);
        }
      })
      .catch(err => {
        console.warn(err);
      });
  }
}

const spotifyClient = new SpotifyClient(spotifyConfig);
export default spotifyClient;
