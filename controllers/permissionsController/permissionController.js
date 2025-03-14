const { validationResult } = require('express-validator');
const { Permission, Rank, Module } = require('../../models');

class PermissionController {
    static async getAllPermissions(req, res) {
        try {
            const permissions = await Permission.findAll({ 
                include: [
                    Module,
                    Rank,
                    { association: 'createUser' },
                    { association: 'writeUser' }
                ]
            });
            res.json(permissions);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    static async getPermissionById(req, res) {
        try {
            const permission = await Permission.findByPk(req.params.id, { 
                include: [
                    Module,
                    Rank,
                    { association: 'createUser' },
                    { association: 'writeUser' }
                ]
            });
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
            const newPermission = await Permission.findByPk(permission.id, { 
                include: [
                    Module,
                    Rank,
                    { association: 'createUser' },
                    { association: 'writeUser' }
                ]
            });
            res.status(201).json(newPermission);
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
            const updatedPermission = await Permission.findByPk(req.params.id, { 
                include: [
                    Module,
                    Rank,
                    { association: 'createUser' },
                    { association: 'writeUser' }
                ]
            });
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
            const permissions = await Permission.findAll({ 
                where: { namePermission: { [Op.like]: `%${req.params.name}%` } },
                include: [
                    Module,
                    Rank,
                    { association: 'createUser' },
                    { association: 'writeUser' }
                ],
            });
            res.json(permissions);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    static async getPermissionsByPage(req, res) {
        const { limit, offset } = req.query;
        try {
            const permissions = await Permission.findAll({ 
                limit: parseInt(limit), 
                offset: parseInt(offset),
                include: [
                    Module,
                    Rank,
                    { association: 'createUser' },
                    { association: 'writeUser' }
                ]
            });
            res.json(permissions);
        } catch (err) {
            res.status(500).send(err);
        }
    }
}

module.exports = PermissionController;
