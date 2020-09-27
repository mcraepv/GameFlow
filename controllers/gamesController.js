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
      const genresAndImgURL = await API.getGameGenresAndImgURL(title);
      let newGame;
      newGame = {
        title: title,
        genres: genresAndImgURL.genresArr,
        appID: appID,
        imgURL: genresAndImgURL.imgURL,
      };
      game = await db.Game.create(newGame);
    }
    return game;
  },

  getFavorite: async (title) => {
    const game = await db.Game.findOne({ title: title });
    return game;
  },
};
