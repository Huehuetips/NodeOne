const User = require('../models/userModel');

class UserController {
    static getAllUsers(req, res) {
        User.getAllUsers((err, users) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(users); // Asegúrate de devolver JSON
        });
    }

    static getUserById(req, res) {
        const userId = req.params.id;
        User.getUserById(userId, (err, user) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(user); // Asegúrate de devolver JSON
        });
    }

    // static getAlternateView(req, res) {
    //     User.getAllUsers((err, users) => {
    //         if (err) {
    //             return res.status(500).send(err);
    //         }
    //         res.render('index', { title: 'Alternate Chat App', users: users, layout: 'layouts/alternate' }); // Usar layout alternativo
    //     });
    // }

    static renderUsersPage(req, res) {
        User.getAllUsers((err, users) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('users', { title: 'Users Page', users: users }); // Usar layout predeterminado
        });
    }

    // ...other methods for creating, updating, and deleting users...
}

module.exports = UserController;
