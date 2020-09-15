const { json } = require('express');
const db = require('../models');
const API = require('../utils/API');
const gamesController = require('./gamesController');

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
  create: async (id) => {
    try {
      let user = await db.User.findOne({
        steamID: id,
      });
      if (!user) {
        const appIDs = await API.getOwnedGames(id);
        user = await db.User.create({
          steamID: id,
          appIDs: appIDs,
        });
      }
      const getGames = async (user) => {
        const games = [];
        for (let i = 0; i < user.appIDs.length; i++) {
          const appID = user.appIDs[i];
          const game = await gamesController.create(appID);
          games.push(game);
        }
        return games;
      };
      const games = await getGames(user);
      return games;
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
