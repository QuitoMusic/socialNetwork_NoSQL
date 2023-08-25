const mongoose = require('mongoose');

// Defining the reaction schema using the mongoose.Schema class
const reactionSchema = new mongoose.Schema({
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => formatDate(timestamp), 
  },
});

// Function to format timestamps (you can replace this with your preferred method)
function formatDate(timestamp) {
  return new Date(timestamp).toISOString();
}

// Creating a Mongoose model named 'Reaction' based on the reactionSchema
const Reaction = mongoose.model('Reaction', reactionSchema);


module.exports = Reaction;
