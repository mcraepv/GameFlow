const router = require('express').Router();
const userRoutes = require('./users');
const quizRoutes = require('./quiz');
const favoritesRoutes = require('./favorites');

router.use('/users', userRoutes);

router.use('/quiz', quizRoutes);

router.use('/favorites', favoritesRoutes);

module.exports = router;
