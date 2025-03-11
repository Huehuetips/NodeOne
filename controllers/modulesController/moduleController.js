const { validationResult } = require('express-validator');
const Module = require('../../models/moduleModel');

class ModuleController {
    static getAllModules(req, res) {
        Module.getAllModules((err, modules) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(modules);
        });
    }

    static getModuleById(req, res) {
        const moduleId = req.params.id;
        Module.getModuleById(moduleId, (err, module) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(module);
        });
    }

    static createModule(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { nameModule, descriptionModule } = req.body;
        const newModule = new Module(null, nameModule, descriptionModule);
        newModule.save((err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(201).json(result);
        });
    }

    static updateModule(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id, nameModule, descriptionModule } = req.body;
        const updatedModule = new Module(id, nameModule, descriptionModule);
        updatedModule.save((err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(result);
        });
    }

    static deleteModule(req, res) {
        const moduleId = req.params.id;
        Module.deleteModule(moduleId, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(result);
        });
    }

    static searchModuleByName(req, res) {
        const name = req.params.name;
        Module.searchModuleByName(name, (err, modules) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(modules);
        });
    }

    static getModulesByPage(req, res) {
        const { limit, offset } = req.query;
        Module.getModulesByPage(parseInt(limit), parseInt(offset), (err, modules) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(modules);
        });
    }
}

module.exports = ModuleController;
