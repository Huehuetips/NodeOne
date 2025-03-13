const { RankPermission } = require('../../models');

class RankPermissionFrontend {
    static async renderRankPermissionsPage(req, res) {
        try {
            const rankPermissions = await RankPermission.findAll();
            res.render('rank_permissions/index', { title: 'Rank Permissions', rankPermissions });
        } catch (err) {
            res.status(500).send('Error fetching rank permissions');
        }
    }

    static renderCreateRankPermissionPage(req, res) {
        res.render('rank_permissions/create', { title: 'Crear Permiso de Rango' });
    }

    static async renderUpdateRankPermissionPage(req, res) {
        try {
            const rankPermission = await RankPermission.findOne({ where: { rankId: req.params.rankId, permissionId: req.params.permissionId } });
            res.render('rank_permissions/update', { title: 'Actualizar Permiso de Rango', rankPermission });
        } catch (err) {
            res.status(500).send(err);
        }
    }

    static async renderRankPermissionDetailPage(req, res) {
        try {
            const rankPermission = await RankPermission.findOne({ where: { rankId: req.params.rankId, permissionId: req.params.permissionId } });
            res.render('rank_permissions/detail', { title: 'Detalles del Permiso de Rango', rankPermission });
        } catch (err) {
            res.status(500).send(err);
        }
    }
}

module.exports = RankPermissionFrontend;
