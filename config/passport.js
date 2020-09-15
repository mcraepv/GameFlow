const SteamStrategy = require('passport-steam').Strategy;
const usersController = require('../controllers/usersController');

module.exports = (passport) => {
  passport.serializeUser(function (userGames, done) {
    done(null, userGames);
  });

  passport.deserializeUser(function (obj, done) {
    done(null, obj);
  });

  passport.use(
    new SteamStrategy(
      {
        returnURL: 'http://localhost:3001/auth/steam/return',
        realm: 'http://localhost:3001/',
        apiKey: 'C4559EEF7DAF679ED65CF8FB368F5868',
      },
      async function (identifier, profile, done) {
        const userGames = await usersController.create(profile.id);
        done(null, userGames);
      }
    )
  );
};
