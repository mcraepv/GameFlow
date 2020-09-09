const db = require('../models');

module.exports = {
  findBySteamID: async (req, res) => {
    try {
      const user = await db.User.findOne({
        steamID: req.params.id,
      }).populate('quizzes');
      res.json(user);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  create: async (req, res) => {
    try {
      const newUser = await db.User.create(req.body);
      res.json(newUser);
    } catch (err) {
      res.status(422).json(err);
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
      res.status(422).json(err);
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
      res.status(422).json(err);
    }
  },
};
