const express = require('express');
const passport = require('passport');

const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.get(
  '/auth/steam',
  passport.authenticate('steam', { failureRedirect: '/' }),
  function (req, res) {
    res.redirect('/');
  }
);

app.get(
  '/auth/steam/return',
  passport.authenticate('steam', { failureRedirect: '/' }),
  function (req, res) {
    res.redirect('/');
  }
);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.use(routes);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/gameflow');

app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
