const User = require('../models/User');
const Thought = require('../models/Thought');

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateUser(req, res) {
    try {
      const userId = req.params.userId;
      const updatedData = req.body;

      const user = await User.findByIdAndUpdate(
        userId,
        { $set: updatedData },
        { new: true }
      ).select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteSingleUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId }).select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json({ message: 'User And Associated Thoughts Deleted' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async createUsersFriend(req, res) {
    try {
      const userId = req.params.userId; // Assuming you need the user ID to associate the friend
      const friendId = req.params.friendId;
  
      // First, make sure the friend exists
      const friend = await User.findOne({ _id: friendId }).select('-__v');
  
      if (!friend) {
        return res.status(404).json({ message: 'No friend with that ID' });
      }
  
      // You would then update the user's friend list with the friend's ID
      const user = await User.findOneAndUpdate(
        { _id: userId },
        { $push: { friends: friendId } }, // Assuming your User schema has a 'friends' array
        { new: true }
      ).select('-__v');
  
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
  
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteUsersFriend(req, res) {
    try {
      const userId = req.params.userId; // Assuming you need the user ID to remove the friend
      const friendId = req.params.friendId;
  
      // First, make sure the friend exists
      const friend = await User.findOne({ _id: friendId }).select('-__v');
  
      if (!friend) {
        return res.status(404).json({ message: 'No friend with that ID' });
      }
  
      // You would then update the user's friend list to remove the friend's ID
      const user = await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { friends: friendId } }, // Assuming your User schema has a 'friends' array
        { new: true }
      ).select('-__v');
  
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
  
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};
