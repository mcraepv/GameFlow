const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    steamID: { type: Number, required: true },
    appIDs: [{ type: Number, required: true }],
    quizzes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Quiz',
      },
    ],
  },
  { toJSON: { virtuals: true } }
);

UserSchema.virtual('games', {
  ref: 'Game',
  localField: 'appIDs',
  foreignField: 'appID',
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
