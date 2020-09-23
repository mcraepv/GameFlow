const express = require('express');
const passport = require('passport');
const path = require('path');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get(
  '/auth/steam',
  passport.authenticate('steam', { failureRedirect: '/' }),
  function (req, res) {
    // res.redirect('/');
  }
);

app.get(
  '/auth/steam/return',
  passport.authenticate('steam', { failureRedirect: '/' }),
  function (req, res) {
    res.render('authenticated', {
      games: req.user,
      clientUrl: process.env.FRONTEND_URL,
    });
  }
);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname + '/client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
  });
}

app.use(routes);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/gameflow', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
