const { Rank } = require('../../models');

class RankFrontend {
    static async renderRanksPage(req, res) {
        try {
            const ranks = await Rank.findAll();
            res.render('ranks/index', { title: 'Ranks', ranks });
        } catch (err) {
            res.status(500).send('Error fetching ranks');
        }
    }

    static renderCreateRankPage(req, res) {
        res.render('ranks/create', { title: 'Crear Rango' });
    }

    static async renderUpdateRankPage(req, res) {
        try {
            const rank = await Rank.findByPk(req.params.id);
            res.render('ranks/update', { title: 'Actualizar Rango', rank });
        } catch (err) {
            res.status(500).send(err);
        }
    }

    static async renderRankDetailPage(req, res) {
        try {
            const rank = await Rank.findByPk(req.params.id);
            res.render('ranks/detail', { title: 'Detalles del Rango', rank });
        } catch (err) {
            res.status(500).send(err);
        }
    }
}

module.exports = RankFrontend;
