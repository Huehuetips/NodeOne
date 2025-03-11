const express = require('express');
const router = express.Router();
const RankController = require('../../controllers/ranksControllers/rankController');
const { validateUserId, validateUserName } = require('../../middlewares/validationMiddleware');

router.get('/', RankController.getAllRanks);
router.get('/:id', validateUserId, RankController.getRankById);
router.post('/', validateUserName, RankController.createRank);
router.put('/:id', validateUserId, validateUserName, RankController.updateRank);
router.delete('/:id', validateUserId, RankController.deleteRank);
router.get('/search/:name', validateUserName, RankController.searchRankByName);

module.exports = router;
