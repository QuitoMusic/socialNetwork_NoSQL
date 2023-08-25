const connection = require('../config/connection');
const User = require('../models/User');
const Thought = require('../models/Thought');

connection.on('error', (err) => err);

const users = [ {
    username: 'Pepe',
    email: 'Pepito@gmail.com',
  },
  {
    username: 'Pedro',
    email: 'pedrito@gmail.com',
  },
  {
    username: 'Juan',
    email: 'bobo@gmail.com',
  },
  {
    username: 'Emile',
    email: 'emile@gmail.com',
  },
  {
    username: 'Pelito',
    email: 'afro@gmail.com',
  },
  {
    username: 'Danny',
    email: 'daniel@gmail.com',
  },
  {
    username: 'Trisha',
    email: 'paytas@gmail.com',
  },
  {
    username: 'Ethan',
    email: 'klein@gmail.com',
  },]
  
  connection.once('open', async () => {
    console.log('connected');

    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
  if (userCheck.length) {
    await connection.dropCollection('users');
  }
    await User.collection.insertMany(users);
    console.log('database seeded');
    return;
  });