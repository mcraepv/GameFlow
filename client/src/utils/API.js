import axios from 'axios';

export default {
  addToFavorites: (title, steamID) => {
    return axios.post('/api/favorites', { title: title, steamID: steamID });
  },

  getFavorites: (steamID) => {
    return axios.get(`/api/favorites/${steamID}`);
  },

  deleteFromFavorites: (title, steamID) => {
    return axios.put('/api/favorites', {
      title: title,
      steamID: steamID,
    });
  },
};
