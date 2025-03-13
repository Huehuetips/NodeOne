const { Permission } = require('../../models');

class PermissionFrontend {
    static async renderPermissionsPage(req, res) {
        try {
            const permissions = await Permission.findAll();
            res.render('permissions/index', { title: 'Permissions', permissions });
        } catch (err) {
            res.status(500).send('Error fetching permissions');
        }
    }

    static renderCreatePermissionPage(req, res) {
        res.render('permissions/create', { title: 'Crear Permiso' });
    }

    static async renderUpdatePermissionPage(req, res) {
        try {
            const permission = await Permission.findByPk(req.params.id);
            res.render('permissions/update', { title: 'Actualizar Permiso', permission });
        } catch (err) {
            res.status(500).send(err);
        }
    }

    static async renderPermissionDetailPage(req, res) {
        try {
            const permission = await Permission.findByPk(req.params.id);
            res.render('permissions/detail', { title: 'Detalles del Permiso', permission });
        } catch (err) {
            res.status(500).send(err);
        }
    }
}

module.exports = PermissionFrontend;
