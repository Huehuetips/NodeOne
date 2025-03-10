const { validationResult } = require('express-validator');
const User = require('../../models/userModel');

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

    static createUser(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('Validation errors:', errors.array());
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, user, email, password } = req.body;
        console.log('Received data:', { name, user, email, password });
        const newUser = new User(null, name, user, email, password);
        newUser.save((err, result) => {
            if (err) {
                console.log('Error saving user:', err);
                console.log('Received data:', { name, user, email, password });
                return res.status(500).send(err);
            }
            res.status(201).json(result);
        });
    }

    static updateUser(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('Validation errors:', errors.array());
            return res.status(400).json({ errors: errors.array() });
        }

        const { id, name, user, email, password, enable } = req.body;
        const updatedUser = new User(id, name, user, email, password, enable);
        updatedUser.save((err, result) => {
            if (err) {
                console.log('Error updating user:', err);
                console.log('Received data:', { id, name, user, email, password, enable });
                return res.status(500).send(err);
            }
            res.json(result);
        });
    }

    static deleteUser(req, res) {
        const userId = req.params.id;
        User.deleteUser(userId, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(result);
        });
    }

    static searchUserByName(req, res) {
        const name = req.params.name;
        User.searchUserByName(name, (err, users) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(users);
        });
    }

    static getUsersByPage(req, res) {
        const { limit, offset } = req.query;
        User.getUsersByPage(parseInt(limit), parseInt(offset), (err, users) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(users);
        });
    }

    static disableUser(req, res) {
        const userId = req.params.id;
        User.disableUser(userId, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(result);
        });
    }

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
