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
    // res.redirect('/');
    console.log(req.user);
    // console.log('this is the request:', req);
    // console.log('this is the response:', res);
    console.log('auth/steam/return');
    res.render('authenticated', {
      games: req.user,
      clientUrl: process.env.FRONTEND_URL,
    });
  }
);

if (process.env.NODE_ENV === 'production') {
  const root = path.join(__dirname, 'client', 'build');
  app.use(express.static(root));
  app.get('*', (req, res) => {
    res.sendFile('index.html', { root });
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
