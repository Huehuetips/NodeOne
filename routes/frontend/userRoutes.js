const express = require('express');
const router = express.Router();
const userFrontend = require('../../controllers/usersController/userFrontend');

router.get('/', userFrontend.renderUsersPage);
router.get('/create', userFrontend.renderCreateUserPage);
router.get('/update/:id', userFrontend.renderUpdateUserPage);
router.get('/detail/:id', userFrontend.renderUserDetailPage);

module.exports = router;
