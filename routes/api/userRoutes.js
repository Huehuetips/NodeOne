const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/usersController/userController');
const { validateUser } = require('../../middlewares/validationMiddleware');

router.get('/', UserController.getAllUsers);
router.get('/:id',  UserController.getUserById);
router.post('/', validateUser, UserController.createUser);
router.put('/:id',  validateUser, UserController.updateUser);
router.delete('/:id',  UserController.deleteUser);
router.get('/search/:name', UserController.searchUserByName);

module.exports = router;
