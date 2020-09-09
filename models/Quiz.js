const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuizSchema = new Schema({
  questionAnswers: {
    type: Array,
    required: true,
  },
});

const Quiz = mongoose.model('Quiz', QuizSchema);

module.exports = Quiz;
