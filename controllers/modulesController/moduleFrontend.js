const Module = require('../../models/moduleModel');

class ModuleFrontend {
    static renderModulesPage(req, res) {
        Module.getAllModules((err, modules) => {
            if (err) {
                return res.status(500).send('Error fetching modules');
            }
            res.render('modules/index', { title: 'Modules', modules });
        });
    }

    static renderCreateModulePage(req, res) {
        res.render('modules/create', { title: 'Crear Módulo' });
    }

    static renderUpdateModulePage(req, res) {
        const moduleId = req.params.id;
        Module.getModuleById(moduleId, (err, module) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('modules/update', { title: 'Actualizar Módulo', module });
        });
    }

    static renderModuleDetailPage(req, res) {
        const moduleId = req.params.id;
        Module.getModuleById(moduleId, (err, module) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('modules/detail', { title: 'Detalles del Módulo', module });
        });
    }
}

module.exports = ModuleFrontend;
