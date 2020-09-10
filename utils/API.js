const axios = require('axios');

const baseURL = 'http://api.steampowered.com/';
const apiKey = 'key=C4559EEF7DAF679ED65CF8FB368F5868';

module.exports = {
  getOwnedGames: async (id) => {
    const branch = 'IPlayerService/';
    const method = 'GetOwnedGames/v0001/?';
    const URL = `${baseURL}${branch}${method}${apiKey}&steamid=${id}format=json`;
    const apiCall = await axios.get(URL);
    const gameObjects = apiCall.data.response.games;
    const gameIDs = [];

    gameObjects.forEach((game) => {
      gameIDs.push(game.appid);
    });
    return gameIDs;
  },
};

//getownedgames http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=XXXXXXXXXXXXXXXXX&steamid=76561197960434622&format=json
//getGameSchema http://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key=XXXXXXXXXXXXXXXXX&appid=218620
