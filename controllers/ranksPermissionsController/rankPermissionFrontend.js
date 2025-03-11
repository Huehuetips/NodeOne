const RankPermission = require('../../models/rankPermissionModel');

class RankPermissionFrontend {
    static renderRankPermissionsPage(req, res) {
        RankPermission.getAllRankPermissions((err, rankPermissions) => {
            if (err) {
                return res.status(500).send('Error fetching rank permissions');
            }
            res.render('rank_permissions/index', { title: 'Rank Permissions', rankPermissions });
        });
    }

    static renderCreateRankPermissionPage(req, res) {
        res.render('rank_permissions/create', { title: 'Crear Permiso de Rango' });
    }

    static renderUpdateRankPermissionPage(req, res) {
        const { rankId, permissionId } = req.params;
        RankPermission.getRankPermissionById(rankId, permissionId, (err, rankPermission) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('rank_permissions/update', { title: 'Actualizar Permiso de Rango', rankPermission });
        });
    }

    static renderRankPermissionDetailPage(req, res) {
        const { rankId, permissionId } = req.params;
        RankPermission.getRankPermissionById(rankId, permissionId, (err, rankPermission) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('rank_permissions/detail', { title: 'Detalles del Permiso de Rango', rankPermission });
        });
    }
}

module.exports = RankPermissionFrontend;
