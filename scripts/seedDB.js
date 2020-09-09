const mongoose = require('mongoose');
const db = require('../models');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/gameflow');

const createDummyID = () => {
  let output = '';
  for (let i = 0; i < 17; i++) {
    const num = Math.floor(Math.random() * 10);
    output += num;
  }
  return parseInt(output);
};

const usersSeed = [
  {
    steamID: createDummyID(),
    appIDs: [397540, 72850, 863550],
  },
  {
    steamID: createDummyID(),
    appIDs: [397540, 72850, 863550],
  },
  {
    steamID: createDummyID(),
    appIDs: [397540, 72850, 863550],
  },
  {
    steamID: createDummyID(),
    appIDs: [397540, 72850, 863550],
  },
  {
    steamID: createDummyID(),
    appIDs: [397540, 72850, 863550],
  },
  {
    steamID: createDummyID(),
    appIDs: [397540, 72850, 863550],
  },
  {
    steamID: createDummyID(),
    appIDs: [397540, 72850, 863550],
  },
  {
    steamID: createDummyID(),
    appIDs: [397540, 72850, 863550],
  },
  {
    steamID: createDummyID(),
    appIDs: [397540, 72850, 863550],
  },
];

const gamesSeed = [
  {
    name: 'Borderlands 3',
    genres: ['RPG', 'FPS', 'Looter Shooter'],
    appID: 397540,
  },
  {
    name: 'Skyrim',
    genres: ['RPG', 'Fantasy', 'Adventure'],
    appID: 72850,
  },
  {
    name: 'Hitman 2',
    genres: ['Action'],
    appID: 863550,
  },
];

const insert = async () => {
  await db.User.deleteMany({});
  await db.Game.deleteMany({});
  const userData = await db.User.collection.insertMany(usersSeed);
  const gameData = await db.Game.collection.insertMany(gamesSeed);
  console.log(userData.result.n + ' user records');
  console.log(gameData.result.n + ' game records');
  // console.log(userData);
  // console.log(gameData);

  const f = await db.User.find({}).populate('games').exec();

  process.exit(0);
};

insert();

// db.User.find({})
//   .populate('games')
//   .exec((err, users) => {
//     console.log(users);
//   });
