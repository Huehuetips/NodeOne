const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/usersController/userController');
const { validateUser, validateUserId, validateUserName } = require('../../middlewares/validationMiddleware');

router.get('/', UserController.getAllUsers);
router.get('/:id', validateUserId, UserController.getUserById);
router.post('/', validateUser, UserController.createUser);
router.put('/:id', validateUserId, validateUser, UserController.updateUser);
router.delete('/:id', validateUserId, UserController.deleteUser);
router.get('/search/:name', validateUserName, UserController.searchUserByName);

module.exports = router;
