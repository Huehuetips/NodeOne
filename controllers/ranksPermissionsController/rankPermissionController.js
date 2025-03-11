const { validationResult } = require('express-validator');
const RankPermission = require('../../models/rankPermissionModel');

class RankPermissionController {
    static getAllRankPermissions(req, res) {
        RankPermission.getAllRankPermissions((err, rankPermissions) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(rankPermissions);
        });
    }

    static getRankPermissionById(req, res) {
        const { rankId, permissionId } = req.params;
        RankPermission.getRankPermissionById(rankId, permissionId, (err, rankPermission) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(rankPermission);
        });
    }

    static createRankPermission(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { rankId, permissionId } = req.body;
        const newRankPermission = new RankPermission(rankId, permissionId);
        newRankPermission.save((err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(201).json(result);
        });
    }

    static updateRankPermission(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { rankId, permissionId } = req.body;
        const updatedRankPermission = new RankPermission(rankId, permissionId);
        updatedRankPermission.save((err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(result);
        });
    }

    static deleteRankPermission(req, res) {
        const { rankId, permissionId } = req.params;
        RankPermission.deleteRankPermission(rankId, permissionId, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(result);
        });
    }

    static searchRankPermissionsByRank(req, res) {
        const rankId = req.params.rankId;
        RankPermission.searchRankPermissionsByRank(rankId, (err, rankPermissions) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(rankPermissions);
        });
    }

    static searchRankPermissionsByPermission(req, res) {
        const permissionId = req.params.permissionId;
        RankPermission.searchRankPermissionsByPermission(permissionId, (err, rankPermissions) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(rankPermissions);
        });
    }

    static getRankPermissionsByPage(req, res) {
        const { limit, offset } = req.query;
        RankPermission.getRankPermissionsByPage(parseInt(limit), parseInt(offset), (err, rankPermissions) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(rankPermissions);
        });
    }
}

module.exports = RankPermissionController;
