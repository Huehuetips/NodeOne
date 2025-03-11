const express = require('express');
const router = express.Router();
const ModuleController = require('../../controllers/modulesController/moduleController');
const { validateUserId, validateUserName } = require('../../middlewares/validationMiddleware');

router.get('/', ModuleController.getAllModules);
router.get('/:id', validateUserId, ModuleController.getModuleById);
router.post('/', validateUserName, ModuleController.createModule);
router.put('/:id', validateUserId, validateUserName, ModuleController.updateModule);
router.delete('/:id', validateUserId, ModuleController.deleteModule);
router.get('/search/:name', validateUserName, ModuleController.searchModuleByName);

module.exports = router;
