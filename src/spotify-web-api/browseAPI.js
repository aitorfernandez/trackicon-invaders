import spotifyClient from './../spotifyClient';

class BrowseAPI {
  getAvailableGenreSeeds() {
    return spotifyClient.endpoint('recommendations/available-genre-seeds', 'GET');
  }

  getRecommendations(genre, limit = 100) {
    return spotifyClient.endpoint(`recommendations?limit=${ limit }&seed_genres=${ genre }`, 'GET');
  }
}

const browseAPI = new BrowseAPI();
export default browseAPI;
