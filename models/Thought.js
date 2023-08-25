const mongoose = require('mongoose');

// Defining the thought schema using the mongoose.Schema class
const thoughtSchema = new mongoose.Schema({

  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  // Timestamp of when the thought was created
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => formatDate(timestamp),
  },
 
  username: {
    type: String,
    required: true,
  },
  
  reactions: [
    {
      reactionId: mongoose.Schema.Types.ObjectId, 
      reactionBody: String, 
      username: String, 
      createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => formatDate(timestamp),
      },
    },
  ],
});

// Virtual property `reactionCount` to get the count of reactions
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length; // Return the length of the reactions array
});


function formatDate(timestamp) {
  return new Date(timestamp).toISOString();
}


const Thought = mongoose.model('Thought', thoughtSchema);


module.exports = Thought;
