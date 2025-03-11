const express = require('express');
const router = express.Router();
const PermissionFrontend = require('../../controllers/permissionsController/permissionFrontend');

router.get('/', PermissionFrontend.renderPermissionsPage);
router.get('/create', PermissionFrontend.renderCreatePermissionPage);
router.get('/update/:id', PermissionFrontend.renderUpdatePermissionPage);
router.get('/detail/:id', PermissionFrontend.renderPermissionDetailPage);

module.exports = router;
