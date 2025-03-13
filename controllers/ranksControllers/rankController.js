const { validationResult } = require('express-validator');
const { Rank } = require('../../models');

class RankController {
    static async getAllRanks(req, res) {
        try {
            const ranks = await Rank.findAll();
            res.json(ranks);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    static async getRankById(req, res) {
        try {
            const rank = await Rank.findByPk(req.params.id);
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
            res.status(201).json(rank);
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
            const updatedRank = await Rank.findByPk(req.params.id);
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
            const ranks = await Rank.findAll({ where: { nameRank: { [Op.like]: `%${req.params.name}%` } } });
            res.json(ranks);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    static async getRanksByPage(req, res) {
        const { limit, offset } = req.query;
        try {
            const ranks = await Rank.findAll({ limit: parseInt(limit), offset: parseInt(offset) });
            res.json(ranks);
        } catch (err) {
            res.status(500).send(err);
        }
    }
}

module.exports = RankController;
