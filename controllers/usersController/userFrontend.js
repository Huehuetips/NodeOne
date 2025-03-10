const User = require('../../models/userModel');

class userFrontend {
    static renderUsersPage(req, res) {
        User.getAllUsers((err, users) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('users/index', { title: 'Users Page', users: users });
        });
    }

    static renderCreateUserPage(req, res) {
        res.render('users/create', { title: 'Crear Usuario' });
    }

    static renderUpdateUserPage(req, res) {
        const userId = req.params.id;
        User.getUserById(userId, (err, user) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('users/update', { title: 'Actualizar Usuario', user });
        });
    }

    static renderUserDetailPage(req, res) {
        const userId = req.params.id;
        User.getUserById(userId, (err, user) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('users/detail', { title: 'Detalles del Usuario', user });
        });
    }
}

module.exports = userFrontend;
