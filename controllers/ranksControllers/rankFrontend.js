const Rank = require('../../models/rankModel');

class RankFrontend {
    static renderRanksPage(req, res) {
        Rank.getAllRanks((err, ranks) => {
            if (err) {
                return res.status(500).send('Error fetching ranks');
            }
            res.render('ranks/index', { title: 'Ranks', ranks });
        });
    }

    static renderCreateRankPage(req, res) {
        res.render('ranks/create', { title: 'Crear Rango' });
    }

    static renderUpdateRankPage(req, res) {
        const rankId = req.params.id;
        Rank.getRankById(rankId, (err, rank) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('ranks/update', { title: 'Actualizar Rango', rank });
        });
    }

    static renderRankDetailPage(req, res) {
        const rankId = req.params.id;
        Rank.getRankById(rankId, (err, rank) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('ranks/detail', { title: 'Detalles del Rango', rank });
        });
    }
}

module.exports = RankFrontend;
