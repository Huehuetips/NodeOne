const { validationResult } = require('express-validator');
const Rank = require('../../models/rankModel');

class RankController {
    static getAllRanks(req, res) {
        Rank.getAllRanks((err, ranks) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(ranks);
        });
    }

    static getRankById(req, res) {
        const rankId = req.params.id;
        Rank.getRankById(rankId, (err, rank) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(rank);
        });
    }

    static createRank(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { nameRank } = req.body;
        const newRank = new Rank(null, nameRank);
        newRank.save((err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(201).json(result);
        });
    }

    static updateRank(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id, nameRank } = req.body;
        const updatedRank = new Rank(id, nameRank);
        updatedRank.save((err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(result);
        });
    }

    static deleteRank(req, res) {
        const rankId = req.params.id;
        Rank.deleteRank(rankId, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(result);
        });
    }

    static searchRankByName(req, res) {
        const name = req.params.name;
        Rank.searchRankByName(name, (err, ranks) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(ranks);
        });
    }

    static getRanksByPage(req, res) {
        const { limit, offset } = req.query;
        Rank.getRanksByPage(parseInt(limit), parseInt(offset), (err, ranks) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(ranks);
        });
    }
}

module.exports = RankController;
