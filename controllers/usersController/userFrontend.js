const { User, Rank } = require('../../models');

class userFrontend {    
    static async renderUsersPage(req, res) {
        try {
            const users = await User.findAll({
                include: [
                    Rank,
                    { association: 'createUser' },
                    { association: 'writeUser' },
                ]
            });
            res.render('users/index', { title: 'Users', users });
        } catch (err) {
            res.status(500).send('Error fetching users');
        }
    }

    static async renderCreateUserPage(req, res) {
        try {
            const ranks = await Rank.findAll({ limit: 10 });
            res.render('users/create', { title: 'Crear Usuario', ranks });
        } catch (err) {
            res.status(500).send('Error fetching ranks');
        }
    }

    static async renderUpdateUserPage(req, res) {
        try {
            const user = await User.findByPk(req.params.id);
            res.render('users/update', { title: 'Actualizar Usuario', user });
        } catch (err) {
            res.status(500).send(err);
        }
    }

    static async renderUserDetailPage(req, res) {
        try {
            const user = await User.findByPk(req.params.id, {
                include: [
                    Rank,
                    { association: 'createUser' },
                    { association: 'writeUser' },
                ]
            });
            res.render('users/detail', { title: 'Detalles del Usuario', user });
        } catch (err) {
            res.status(500).send(err);
        }
    }
}

module.exports = userFrontend;
