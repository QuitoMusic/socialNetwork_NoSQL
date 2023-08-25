const mongoose = require('mongoose');

// Defining the user schema using the mongoose.Schema class
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true, 
    required: true, 
    trim: true, 
  },
  // User's email
  email: {
    type: String,
    unique: true, 
    required: true, 
    match: [/.+@.+\..+/, 'Please enter a valid email address'], // Email format validation
  },
  // Array of references to the user's thoughts
  thoughts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Thought', 
    },
  ],
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
    },
  ],
});

// Virtual property `friendCount` to get the count of friends
userSchema.virtual('friendCount').get(function () {
  return this.friends.length; 
});


const User = mongoose.model('User', userSchema);


module.exports = User;

