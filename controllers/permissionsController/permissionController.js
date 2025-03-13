const { validationResult } = require('express-validator');
const { Permission } = require('../../models');

class PermissionController {
    static async getAllPermissions(req, res) {
        try {
            const permissions = await Permission.findAll();
            res.json(permissions);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    static async getPermissionById(req, res) {
        try {
            const permission = await Permission.findByPk(req.params.id);
            res.json(permission);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    static async createPermission(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const permission = await Permission.create(req.body);
            res.status(201).json(permission);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    static async updatePermission(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            await Permission.update(req.body, { where: { id: req.params.id } });
            const updatedPermission = await Permission.findByPk(req.params.id);
            res.json(updatedPermission);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    static async deletePermission(req, res) {
        try {
            await Permission.destroy({ where: { id: req.params.id } });
            res.json({ message: 'Permission deleted successfully' });
        } catch (err) {
            res.status(500).send(err);
        }
    }

    static async searchPermissionByName(req, res) {
        try {
            const permissions = await Permission.findAll({ where: { namePermission: { [Op.like]: `%${req.params.name}%` } } });
            res.json(permissions);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    static async getPermissionsByPage(req, res) {
        const { limit, offset } = req.query;
        try {
            const permissions = await Permission.findAll({ limit: parseInt(limit), offset: parseInt(offset) });
            res.json(permissions);
        } catch (err) {
            res.status(500).send(err);
        }
    }
}

module.exports = PermissionController;
