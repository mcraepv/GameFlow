const router = require('express').Router();
const fs = require('fs');
const quiz = require('../../utils/quiz.json');

router.route('/').get((req, res) => {
  res.status(200).json(quiz);
});

module.exports = router;
