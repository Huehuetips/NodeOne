const express = require('express');
const router = express.Router();
const RankPermissionController = require('../../controllers/ranksPermissionsController/rankPermissionController');
const { validateUserId } = require('../../middlewares/validationMiddleware');

router.get('/', RankPermissionController.getAllRankPermissions);
router.get('/:rankId/:permissionId', validateUserId, RankPermissionController.getRankPermissionById);
router.post('/', validateUserId, RankPermissionController.createRankPermission);
router.put('/:rankId/:permissionId', validateUserId, RankPermissionController.updateRankPermission);
router.delete('/:rankId/:permissionId', validateUserId, RankPermissionController.deleteRankPermission);
router.get('/search/rank/:rankId', validateUserId, RankPermissionController.searchRankPermissionsByRank);
router.get('/search/permission/:permissionId', validateUserId, RankPermissionController.searchRankPermissionsByPermission);

module.exports = router;
