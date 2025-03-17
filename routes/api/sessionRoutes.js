const express = require('express');
const router = express.Router();
const SessionController = require('../../controllers/sessionsController/sessionController');

router.get('/', SessionController.getAllSessions);
router.get('/:id', SessionController.getSessionById);
router.post('/', SessionController.createSession);
router.put('/:id', SessionController.updateSession);
router.delete('/:id', SessionController.deleteSession);
router.get('/search/:userId', SessionController.searchSessionByUser);

module.exports = router;
