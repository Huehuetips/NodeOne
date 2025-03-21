const { validationResult } = require('express-validator');
const { Module } = require('../../models');

class ModuleController {
    static async getAllModules(req, res) {
        try {
            const modules = await Module.findAll({ 
                include: [
                    { association: 'createUser' }, 
                    { association: 'writeUser' },
                ], 
            });
            res.json(modules);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    static async getModuleById(req, res) {
        try {
            const module = await Module.findByPk(req.params.id, { 
                include: [
                    { association: 'createUser' }, 
                    { association: 'writeUser' }
                ], 
            });
            res.json(module);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    static async createModule(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const module = await Module.create(req.body);
            const newModule = await Module.findByPk(module.id, {
                include: [
                    { association: 'createUser' },
                    { association: 'writeUser' }
                ]
            });
            res.status(201).json(newModule);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    static async updateModule(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            await Module.update(req.body, { where: { id: req.params.id } });
            const updatedModule = await Module.findByPk(req.params.id, { 
                include: [
                    { association: 'createUser' }, 
                    { association: 'writeUser' }
                ], 
            });
            res.json(updatedModule);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    static async deleteModule(req, res) {
        try {
            await Module.destroy({ where: { id: req.params.id } });
            res.json({ message: 'Module deleted successfully' });
        } catch (err) {
            res.status(500).send(err);
        }
    }

    static async searchModuleByName(req, res) {
        try {
            const modules = await Module.findAll({ 
                where: { nameModule: { [Op.like]: `%${req.params.name}%` } },
                include: [
                    { association: 'createUser' }, 
                    { association: 'writeUser' }
                ],
            });
            res.json(modules);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    static async getModulesByPage(req, res) {
        const { limit, offset } = req.query;
        try {
            const modules = await Module.findAll({ 
                limit: parseInt(limit), 
                offset: parseInt(offset),
                include: [
                    { association: 'createUser' }, 
                    { association: 'writeUser' }
                ],
            });
            res.json(modules);
        } catch (err) {
            res.status(500).send(err);
        }
    }
}

module.exports = ModuleController;
