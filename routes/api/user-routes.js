const router = require('express').Router();
const {
    // Import controller functions for handling different user operations
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteSingleUser,
    createUsersFriend,
    deleteUsersFriend
} = require('../../controllers/user-controller');

// Define routes for handling user-related operations
router.route('/').get(getUsers).post(createUser);
router.route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteSingleUser);
router.route('/:userId/friends/:friendId')
    .post(createUsersFriend)
    .delete(deleteUsersFriend);

module.exports = router;


