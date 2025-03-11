const { validationResult } = require('express-validator');
const Permission = require('../../models/permissionModel');

class PermissionController {
    static getAllPermissions(req, res) {
        Permission.getAllPermissions((err, permissions) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(permissions);
        });
    }

    static getPermissionById(req, res) {
        const permissionId = req.params.id;
        Permission.getPermissionById(permissionId, (err, permission) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(permission);
        });
    }

    static createPermission(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { namePermission, moduleId } = req.body;
        const newPermission = new Permission(null, moduleId, namePermission);
        newPermission.save((err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(201).json(result);
        });
    }

    static updatePermission(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id, namePermission, moduleId } = req.body;
        const updatedPermission = new Permission(id, moduleId, namePermission);
        updatedPermission.save((err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(result);
        });
    }

    static deletePermission(req, res) {
        const permissionId = req.params.id;
        Permission.deletePermission(permissionId, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(result);
        });
    }

    static searchPermissionByName(req, res) {
        const name = req.params.name;
        Permission.searchPermissionByName(name, (err, permissions) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(permissions);
        });
    }

    static getPermissionsByPage(req, res) {
        const { limit, offset } = req.query;
        Permission.getPermissionsByPage(parseInt(limit), parseInt(offset), (err, permissions) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(permissions);
        });
    }
}

module.exports = PermissionController;
