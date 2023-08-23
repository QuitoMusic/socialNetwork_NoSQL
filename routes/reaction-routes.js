const router = require('express').Router();
const {
  createReaction,
  deleteReaction
} = require('../controllers/reaction-controller');

// Define routes
router.post('/thoughts/:thoughtId/reactions', createReaction);
router.delete('/thoughts/:thoughtId/reactions/:reactionId', deleteReaction);

module.exports = router;
