const { validationResult } = require('express-validator');
const { Session } = require('../../models');
const { Op } = require('sequelize');

class SessionController {
    static async getAllSessions(req, res) {
        try {
            const sessions = await Session.findAll({
                include: [
                    { association: 'user'}
                ]
            });
            res.json(sessions);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    static async getSessionById(req, res) {
        try {
            const session = await Session.findByPk(req.params.id, {
                include: [
                    { association: 'user'}
                ]
            });
            res.json(session);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    static async createSession(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const session = await Session.create(req.body);
            const newSession = await Session.findByPk(session.id, {
                include: [
                    { association: 'user'}
                ]
            });
            res.status(201).json(newSession);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    static async updateSession(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            await Session.update(req.body, { where: { id: req.params.id } });
            const updatedSession = await Session.findByPk(req.params.id, {
                include: [
                    { association: 'user'}
                ]
            });
            res.json(updatedSession);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    static async deleteSession(req, res) {
        try {
            await Session.destroy({ where: { id: req.params.id } });
            res.json({ message: 'Session deleted successfully' });
        } catch (err) {
            res.status(500).send(err);
        }
    }

    static async searchSessionByUser(req, res) {
        try {
            const sessions = await Session.findAll({
                where: { userId: { [Op.like]: `%${req.params.userId}%` } },
                include: [
                    { association: 'user'}
                ]
            });
            res.json(sessions);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    static async getSessionsByPage(req, res) {
        const { limit, offset } = req.query;
        try {
            const sessions = await Session.findAll({
                limit: parseInt(limit),
                offset: parseInt(offset),
                include: [
                    { association: 'user'}
                ]
            });
            res.json(sessions);
        } catch (err) {
            res.status(500).send(err);
        }
    }
}

module.exports = SessionController;
