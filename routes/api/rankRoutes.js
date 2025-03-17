const express = require('express');
const router = express.Router();
const RankController = require('../../controllers/ranksControllers/rankController');

router.get('/', RankController.getAllRanks);
router.get('/:id',  RankController.getRankById);
router.post('/', RankController.createRank);
router.put('/:id',  RankController.updateRank);
router.delete('/:id',  RankController.deleteRank);
router.get('/search/:name', RankController.searchRankByName);

module.exports = router;
