const db = require('../models');
const API = require('../utils/API');

module.exports = {
  create: async (appID) => {
    let game = await db.Game.findOne({
      appID: appID,
    });
    if (!game) {
      let game = await API.getGameSchema(appID);
      let title = game.gameName;
      if (!title || title.includes('ValveTestApp')) {
        return;
      }
      if (title.includes('™' || '®' || '©')) {
        title = title.replace(/™/g, '');
        title = title.replace(/®/g, '');
        title = title.replace(/©/g, '');
      }
      const genres = await API.getGameGenres(title);
      let newGame;
      if (genres) {
        newGame = {
          title: title,
          genres: genres,
          appID: appID,
        };
      } else {
        newGame = {
          title: title,
          appID: appID,
        };
      }
      game = await db.Game.create(newGame);
    }
    return game;
  },
};
