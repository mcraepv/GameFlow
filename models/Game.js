const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  genres: { type: [String], required: true },
  rating: Number,
  appID: { type: Number, required: true },
});

const Game = mongoose.model('Game', GameSchema);

module.exports = Game;
