const { validationResult } = require('express-validator');
const { User , Rank } = require('../../models');
const { Op } = require('sequelize');
const { Session } = require('express-session');
const crypto = require('crypto'); // Importar el módulo crypto

class UserController {
    static async getAllUsers(req, res) {
        try {
            const users = await User.findAll({
                include: [
                    Rank,
                    { association: 'createUser' },
                    { association: 'writeUser' },
                ]
            });
            res.json(users);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    static async getUserById(req, res) {
        try {
            const user = await User.findByPk(req.params.id, {
                include: [
                    Rank,
                    { association: 'createUser' },
                    { association: 'writeUser' }
                ]
            });
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
            const createdUser = await User.findByPk(user.id, {
                include: [
                    Rank,
                    { association: 'createUser' },
                    { association: 'writeUser' }
                ]
            });
            res.status(201).json({ ...createdUser.toJSON(), type: "clean", title: "Usuario creado", text: "El usuario " + createdUser.nameUser + " ha sido creado exitosamente.", icon: "success", position: "top-right" });
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
            const updatedUser = await User.findByPk(req.params.id, {
                include: [
                    Rank,
                    { association: 'createUser' },
                    { association: 'writeUser' }
                ]
            });
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
            const users = await User.findAll({ 
                where: { nameUser: { [Op.like]: `%${req.params.name}%` } },
                include: [
                    Rank,
                    { association: 'createUser' },
                    { association: 'writeUser' }
                ]
            });
            res.json(users);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    static async getUsersByPage(req, res) {
        const { limit, offset } = req.query;
        try {
            const users = await User.findAll({ 
                limit: parseInt(limit), 
                offset: parseInt(offset),
                include: [
                    Rank,
                    { association: 'createUser' },
                    { association: 'writeUser' }
                ]
            });
            res.json(users);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    static async disableUser(req, res) {
        try {
            await User.update({ enable: false }, { where: { id: req.params.id } });
            const updatedUser = await User.findByPk(req.params.id, {
                include: [
                    Rank,
                    { association: 'createUser' },
                    { association: 'writeUser' }
                ]
            });
            res.json(updatedUser);
        } catch (err) {
            res.status(500).send(err);
        }
    }
}

module.exports = UserController;
