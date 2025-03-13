const { Module } = require('../../models');

class ModuleFrontend {
    static async renderModulesPage(req, res) {
        try {
            const modules = await Module.findAll();
            res.render('modules/index', { title: 'Modules', modules });
        } catch (err) {
            res.status(500).send('Error fetching modules');
        }
    }

    static renderCreateModulePage(req, res) {
        res.render('modules/create', { title: 'Crear Módulo' });
    }

    static async renderUpdateModulePage(req, res) {
        try {
            const module = await Module.findByPk(req.params.id);
            res.render('modules/update', { title: 'Actualizar Módulo', module });
        } catch (err) {
            res.status(500).send(err);
        }
    }

    static async renderModuleDetailPage(req, res) {
        try {
            const module = await Module.findByPk(req.params.id);
            res.render('modules/detail', { title: 'Detalles del Módulo', module });
        } catch (err) {
            res.status(500).send(err);
        }
    }
}

module.exports = ModuleFrontend;
