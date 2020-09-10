const SteamStrategy = require('passport-steam').Strategy;
const API = require('../utils/API');

const db = require('../models');
module.exports = (passport) => {
  passport.use(
    new SteamStrategy(
      {
        returnURL: 'http://localhost:3001/auth/steam/return',
        realm: 'http://localhost:3001/',
        apiKey: 'C4559EEF7DAF679ED65CF8FB368F5868',
      },
      async function (identifier, profile, done) {
        //need better login handling (if user exists already, etc. do in controller file)
        const games = await API.getOwnedGames(profile.id);
        console.log(games);
      }
    )
  );
};
