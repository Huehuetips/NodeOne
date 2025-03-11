const express = require('express');
const router = express.Router();
const RankFrontend = require('../../controllers/ranksControllers/rankFrontend');

router.get('/', RankFrontend.renderRanksPage);
router.get('/create', RankFrontend.renderCreateRankPage);
router.get('/update/:id', RankFrontend.renderUpdateRankPage);
router.get('/detail/:id', RankFrontend.renderRankDetailPage);

module.exports = router;
