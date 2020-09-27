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
          if (game) {
            const gameObj = {
              ...game._doc,
              isFavorite: user.favorites.includes(game.title) ? true : false,
            };
            games.push(gameObj);
          } else continue;
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
  addToFavorites: async (req, res) => {
    try {
      const userFavs = await db.User.findOne(
        { steamID: req.body.steamID },
        'favorites'
      );

      let doesExist = false;

      userFavs.favorites.forEach((fav) => {
        if (fav === req.body.title) {
          doesExist = true;
        }
      });

      let user;

      if (!doesExist) {
        user = await db.User.findOneAndUpdate(
          { steamID: req.body.steamID },
          { $push: { favorites: req.body.title } }
        );
      }
      if (user) {
        res.status(201).end();
      } else if (userFavs && doesExist) {
        res.status(200).end();
      } else res.status(500).end();
    } catch (err) {
      throw err;
    }
  },

  getFavorites: async (req, res) => {
    const userFavs = await db.User.findOne(
      { steamID: req.params.steamID },
      'favorites'
    );

    const getFavorites = async (favorites) => {
      const favoritesArr = [];

      for (let i = 0; i < favorites.length; i++) {
        const title = favorites[i];
        const favObj = await gamesController.getFavorite(title);
        favoritesArr.push(favObj);
      }

      return favoritesArr;
    };

    const favoritesArr = await getFavorites(userFavs.favorites);
    console.log(favoritesArr);

    res.status(200).json(favoritesArr);
  },

  deleteFromFavorites: async (req, res) => {
    try {
      const user = await db.User.findOneAndUpdate(
        { steamID: req.body.steamID },
        { $pull: { favorites: req.body.title } },
        { new: true }
      );
      res.status(200).end();
    } catch (err) {
      throw err;
    }
  },
};
