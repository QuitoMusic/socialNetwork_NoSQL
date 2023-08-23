// seeds/seed.js

const mongoose = require('mongoose');
const User = require('../models/User');
const Thought = require('../models/Thought');

mongoose.connect('mongodb://localhost/social-network', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const seedData = async () => {
  try {
    // Create users
    const users = await User.create([
      { username: 'user1', email: 'user1@example.com' },
      { username: 'user2', email: 'user2@example.com' },
      // Add more users as needed
    ]);

    // Create thoughts
    const thoughts = await Thought.create([
      {
        thoughtText: 'Wepa!',
        username: users[0].username
      },
      {
        thoughtText: 'Que es la que hay!?',
        username: users[1].username
      },
      // Add more thoughts as needed
    ]);

    console.log('Seed data inserted successfully');
  } catch (error) {
    console.error('Error inserting seed data:', error);
  } finally {
    // Close the connection
    mongoose.disconnect();
  }
};

// Run the seed data function
seedData();
