const axios = require('axios');

const steamBaseURL = 'http://api.steampowered.com/';
const steamApiKey = 'key=C4559EEF7DAF679ED65CF8FB368F5868';

const rawgBaseURL = 'https://api.rawg.io/api/games?search=';
const rawgHeader = { 'User-Agent': 'GameFlow' };

// const getTags = async () => {
//   const tags = await axios.get('https://api.rawg.io/api/tags?page_size=1000');

//   let i = 0;

//   tags.data.results.forEach((res) => {
//     console.log(res.name);
//     i++;
//   });
//   console.log(i);
// };

// getTags();

module.exports = {
  getOwnedGames: async (id) => {
    const branch = 'IPlayerService/';
    const method = 'GetOwnedGames/v0001/?';
    const URL = `${steamBaseURL}${branch}${method}${steamApiKey}&steamid=${id}format=json`;
    const res = await axios.get(URL);
    const gameObjects = res.data.response.games;
    const gameIDs = [];

    gameObjects.forEach((game) => {
      gameIDs.push(game.appid);
    });
    return gameIDs;
  },

  getGameSchema: async (appID) => {
    const branch = 'ISteamUserStats/';
    const method = 'GetSchemaForGame/v2/?';
    const URL = `${steamBaseURL}${branch}${method}${steamApiKey}&appid=${appID}format=json`;
    const res = await axios.get(URL);
    const game = res.data.game;
    return game;
  },

  getGameGenresAndImgURL: async (title) => {
    const URL = `${rawgBaseURL}${title}`;
    const res = await axios.get(URL, {
      headers: rawgHeader,
    });
    let result;
    const gamesArr = res.data.results;
    for (let i = 0; i < gamesArr.length; i++) {
      const game = gamesArr[i];
      if (game.name === title) {
        result = game;
        break;
      }
    }
    const response = {
      genresArr: [],
      imgURL: '',
    };

    if (result) {
      result.tags.forEach((tag) => {
        const regex = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g;
        if (regex.test(tag.name)) {
          response.genresArr.push(tag.name);
        }
      });
      result.genres.forEach((genre) => {
        response.genresArr.push(genre.name);
      });
      response.imgURL = result.background_image;
    }
    return response;
  },
};

//getownedgames http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=XXXXXXXXXXXXXXXXX&steamid=76561197960434622&format=json
//getGameSchema http://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key=XXXXXXXXXXXXXXXXX&appid=218620
