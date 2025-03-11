const express = require('express');
const router = express.Router();
const PermissionController = require('../../controllers/permissionsController/permissionController');
const { validateUserId, validateUserName } = require('../../middlewares/validationMiddleware');

router.get('/', PermissionController.getAllPermissions);
router.get('/:id', validateUserId, PermissionController.getPermissionById);
router.post('/', validateUserName, PermissionController.createPermission);
router.put('/:id', validateUserId, validateUserName, PermissionController.updatePermission);
router.delete('/:id', validateUserId, PermissionController.deletePermission);
router.get('/search/:name', validateUserName, PermissionController.searchPermissionByName);

module.exports = router;
