const { validationResult } = require('express-validator');
const { Rank, Permission } = require('../../models');
const { Op } = require('sequelize');

class RankController {
    static async getAllRanks(req, res) {
        try {
            const ranks = await Rank.findAll({ 
                include: [
                    Permission, 
                    { association: 'createUser' },
                    { association: 'writeUser' }
                ]
            });
            res.json(ranks);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    static async getRankById(req, res) {
        try {
            const rank = await Rank.findByPk(req.params.id, { 
                include: [
                    Permission,
                    { association: 'createUser' },
                    { association: 'writeUser' }
                ]
            });
            res.json(rank);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    static async createRank(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const rank = await Rank.create(req.body);
            const newRank = await Rank.findByPk(rank.id, { 
                include: [
                    Permission,
                    { association: 'createUser' },
                    { association: 'writeUser' }
                ]
            });
            res.status(201).json(newRank);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    static async updateRank(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            await Rank.update(req.body, { where: { id: req.params.id } });
            const updatedRank = await Rank.findByPk(req.params.id, { 
                include: [
                    Permission,
                    { association: 'createUser' },
                    { association: 'writeUser' }
                ]
            });
            res.json(updatedRank);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    static async deleteRank(req, res) {
        try {
            await Rank.destroy({ where: { id: req.params.id } });
            res.json({ message: 'Rank deleted successfully' });
        } catch (err) {
            res.status(500).send(err);
        }
    }

    static async searchRankByName(req, res) {
        try {
            const ranks = await Rank.findAll({ 
                where: { nameRank: { [Op.like]: `%${req.params.name}%` } },
                include: [
                    Permission,
                    { association: 'createUser' },
                    { association: 'writeUser' }
                ],
            });
            res.json(ranks);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    static async getRanksByPage(req, res) {
        const { limit, offset } = req.query;
        try {
            const ranks = await Rank.findAll({ 
                limit: parseInt(limit), 
                offset: parseInt(offset),
                include: [
                    Permission,
                    { association: 'createUser' },
                    { association: 'writeUser' }
                ]
            });
            res.json(ranks);
        } catch (err) {
            res.status(500).send(err);
        }
    }
}

module.exports = RankController;
