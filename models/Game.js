const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  genres: [String],
  rating: Number,
  appID: { type: Number, required: true },
  imgURL: String,
});

const Game = mongoose.model('Game', GameSchema);

module.exports = Game;
