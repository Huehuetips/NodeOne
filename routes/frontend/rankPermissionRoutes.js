const express = require('express');
const router = express.Router();
const RankPermissionFrontend = require('../../controllers/ranksPermissionsController/rankPermissionFrontend');

router.get('/', RankPermissionFrontend.renderRankPermissionsPage);
router.get('/create', RankPermissionFrontend.renderCreateRankPermissionPage);
router.get('/update/:rankId/:permissionId', RankPermissionFrontend.renderUpdateRankPermissionPage);
router.get('/detail/:rankId/:permissionId', RankPermissionFrontend.renderRankPermissionDetailPage);

module.exports = router;
