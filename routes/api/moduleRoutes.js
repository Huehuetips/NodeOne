const express = require('express');
const router = express.Router();
const ModuleController = require('../../controllers/modulesController/moduleController');

router.get('/', ModuleController.getAllModules);
router.get('/:id', ModuleController.getModuleById);
router.post('/', ModuleController.createModule);
router.put('/:id', ModuleController.updateModule);
router.delete('/:id', ModuleController.deleteModule);
router.get('/search/:name', ModuleController.searchModuleByName);

module.exports = router;
