const Permission = require('../../models/permissionModel');

class PermissionFrontend {
    static renderPermissionsPage(req, res) {
        Permission.getAllPermissions((err, permissions) => {
            if (err) {
                return res.status(500).send('Error fetching permissions');
            }
            res.render('permissions/index', { title: 'Permissions', permissions });
        });
    }

    static renderCreatePermissionPage(req, res) {
        res.render('permissions/create', { title: 'Crear Permiso' });
    }

    static renderUpdatePermissionPage(req, res) {
        const permissionId = req.params.id;
        Permission.getPermissionById(permissionId, (err, permission) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('permissions/update', { title: 'Actualizar Permiso', permission });
        });
    }

    static renderPermissionDetailPage(req, res) {
        const permissionId = req.params.id;
        Permission.getPermissionById(permissionId, (err, permission) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('permissions/detail', { title: 'Detalles del Permiso', permission });
        });
    }
}

module.exports = PermissionFrontend;
