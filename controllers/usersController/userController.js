const { validationResult } = require('express-validator');
const { User } = require('../../models');

class UserController {
    static async getAllUsers(req, res) {
        try {
            const users = await User.findAll();
            res.json(users);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    static async getUserById(req, res) {
        try {
            const user = await User.findByPk(req.params.id);
            res.json(user);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    static async createUser(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ errors: errors.array() });
        }

        try {
            const user = await User.create(req.body);
            res.status(201).json(user);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    static async updateUser(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            await User.update(req.body, { where: { id: req.params.id } });
            const updatedUser = await User.findByPk(req.params.id);
            res.json(updatedUser);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    static async deleteUser(req, res) {
        try {
            await User.destroy({ where: { id: req.params.id } });
            res.json({ message: 'User deleted successfully' });
        } catch (err) {
            res.status(500).send(err);
        }
    }

    static async searchUserByName(req, res) {
        try {
            const users = await User.findAll({ where: { nameUser: { [Op.like]: `%${req.params.name}%` } } });
            res.json(users);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    static async getUsersByPage(req, res) {
        const { limit, offset } = req.query;
        try {
            const users = await User.findAll({ limit: parseInt(limit), offset: parseInt(offset) });
            res.json(users);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    static async disableUser(req, res) {
        try {
            await User.update({ enable: false }, { where: { id: req.params.id } });
            res.json({ message: 'User disabled successfully' });
        } catch (err) {
            res.status(500).send(err);
        }
    }
}

module.exports = UserController;
