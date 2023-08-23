const Thought = require('../../../Projects/Dummy/models/Thought');
const User = require('../../../Projects/Dummy/models/User');

const thoughtController = {
  getAllThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find().populate('reactions');
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getThoughtById: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId).populate('reactions');
      res.json(thought);
    } catch (err) {
      res.status(404).json(err);
    }
  },

  createThought: async (req, res) => {
    try {
      const thought = await Thought.create(req.body);

      // Add the thought's ID to the user's thoughts array
      await User.findOneAndUpdate(
        { username: thought.username },
        { $push: { thoughts: thought._id } }
      );

      res.json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  updateThought: async (req, res) => {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        req.body,
        { new: true }
      );
      res.json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  deleteThought: async (req, res) => {
    try {
      const thought = await Thought.findByIdAndDelete(req.params.thoughtId);

      // Remove thought from associated user's thoughts array
      await User.findOneAndUpdate(
        { username: thought.username },
        { $pull: { thoughts: thought._id } }
      );

      res.json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  }
};

module.exports = thoughtController;
