const db = require('../models');

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
      // console.log(gameIDs);
      // const newUser = await db.User.create(req.body);
      // res.json(newUser);
    } catch (err) {
      console.log(err);
    }
  },
  update: async (req, res) => {
    try {
      const user = await db.User.findOneAndUpdate(
        { steamID: req.params.id },
        req.body
      );
      res.json(user);
    } catch (err) {
      console.log(err);
    }
  },
  remove: async (req, res) => {
    try {
      const user = await db.User.findOne({
        steamID: req.params.id,
      });
      user.remove();
      res.json(user);
    } catch (err) {
      console.log(err);
    }
  },
};
