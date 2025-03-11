const express = require('express');
const router = express.Router();
const ModuleFrontend = require('../../controllers/modulesController/moduleFrontend');

router.get('/', ModuleFrontend.renderModulesPage);
router.get('/create', ModuleFrontend.renderCreateModulePage);
router.get('/update/:id', ModuleFrontend.renderUpdateModulePage);
router.get('/detail/:id', ModuleFrontend.renderModuleDetailPage);

module.exports = router;
