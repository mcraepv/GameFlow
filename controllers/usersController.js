const db = require('../models');
const API = require('../utils/API');

module.exports = {
  findBySteamID: async (id) => {
    try {
      const user = await db.User.findOne({
        steamID: id,
      }).populate('quizzes');
      return user;
    } catch (err) {
      console.log(err);
    }
  },
  create: async (id, appIDs) => {
    try {
      let user = await db.User.findOne({
        steamID: id,
      });
      if (!user) {
        user = await db.User.create({
          steamID: id,
          appIDs: appIDs,
        });
      }
      user.appIDs.forEach(async (appID) => {
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
      });
    } catch (err) {
      console.log(err);
    }
  },
  update: async (id, updateObj) => {
    try {
      const user = await db.User.findOneAndUpdate({ steamID: id }, updateObj);
      res.json(user);
    } catch (err) {
      console.log(err);
    }
  },
  remove: async (id) => {
    try {
      const user = await db.User.findOne({
        steamID: id,
      });
      user.remove();
      res.json(user);
    } catch (err) {
      console.log(err);
    }
  },
};
