const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/usersController/userController');
const { validateUser } = require('../../middlewares/validationMiddleware');
const authMiddleware = require('../../middlewares/authMiddleware');

router.get('/', authMiddleware.authenticateToken, UserController.getAllUsers);
router.get('/:id', authMiddleware.authenticateToken, UserController.getUserById);
router.post('/', authMiddleware.authenticateToken, authMiddleware.authorizePermission('CREATE'), validateUser, UserController.createUser);
router.put('/:id', authMiddleware.authenticateToken, authMiddleware.authorizePermission('WRITE'), validateUser, UserController.updateUser);
router.delete('/:id', authMiddleware.authenticateToken, authMiddleware.authorizePermission('DELETE'), UserController.deleteUser);
router.get('/search/:name', authMiddleware.authenticateToken, UserController.searchUserByName);

module.exports = router;
