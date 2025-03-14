const express = require('express');
const router = express.Router();
const SessionController = require('../../controllers/sessionsController/sessionController');
const { validateUserId } = require('../../middlewares/validationMiddleware');

router.get('/', SessionController.getAllSessions);
router.get('/:id', validateUserId, SessionController.getSessionById);
router.post('/', SessionController.createSession);
router.put('/:id', validateUserId, SessionController.updateSession);
router.delete('/:id', validateUserId, SessionController.deleteSession);
router.get('/search/:userId', validateUserId, SessionController.searchSessionByUser);

module.exports = router;
