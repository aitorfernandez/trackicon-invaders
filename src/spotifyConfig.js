let redirectCallback = 'https://aitorfernandez.github.io/trackicon-invaders';

if (location.host === 'localhost:3000') {
  redirectCallback = 'http://localhost:3000';
}

export default ({
  clientId: process.env.REACT_APP_SPOTICON_CLIENT_ID,
  clientSecret: process.env.REACT_APP_SPOTICON_CLIENT_SECRET,
  redirectUri: redirectCallback,
  stateKey: 'spotify_auth_state'
});
