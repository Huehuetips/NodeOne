const { validationResult } = require('express-validator');
const { RankPermission } = require('../../models');

class RankPermissionController {
    static async getAllRankPermissions(req, res) {
        try {
            const rankPermissions = await RankPermission.findAll();
            res.json(rankPermissions);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    static async getRankPermissionById(req, res) {
        try {
            const rankPermission = await RankPermission.findOne({ where: { rankId: req.params.rankId, permissionId: req.params.permissionId } });
            res.json(rankPermission);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    static async createRankPermission(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const rankPermission = await RankPermission.create(req.body);
            res.status(201).json(rankPermission);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    static async updateRankPermission(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            await RankPermission.update(req.body, { where: { rankId: req.params.rankId, permissionId: req.params.permissionId } });
            const updatedRankPermission = await RankPermission.findOne({ where: { rankId: req.params.rankId, permissionId: req.params.permissionId } });
            res.json(updatedRankPermission);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    static async deleteRankPermission(req, res) {
        try {
            await RankPermission.destroy({ where: { rankId: req.params.rankId, permissionId: req.params.permissionId } });
            res.json({ message: 'Rank Permission deleted successfully' });
        } catch (err) {
            res.status(500).send(err);
        }
    }

    static async searchRankPermissionsByRank(req, res) {
        try {
            const rankPermissions = await RankPermission.findAll({ where: { rankId: req.params.rankId } });
            res.json(rankPermissions);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    static async searchRankPermissionsByPermission(req, res) {
        try {
            const rankPermissions = await RankPermission.findAll({ where: { permissionId: req.params.permissionId } });
            res.json(rankPermissions);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    static async getRankPermissionsByPage(req, res) {
        const { limit, offset } = req.query;
        try {
            const rankPermissions = await RankPermission.findAll({ limit: parseInt(limit), offset: parseInt(offset) });
            res.json(rankPermissions);
        } catch (err) {
            res.status(500).send(err);
        }
    }
}

module.exports = RankPermissionController;
