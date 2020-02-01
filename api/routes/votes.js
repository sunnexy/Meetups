const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const jwt = require('jsonwebtoken');
const getUser = require('../middleware/getUser');

const VotesController = require('../controllers/votes');


router.patch('/:questionId/upvote', getUser, VotesController.votes_upvote);

router.patch('/:questionId/downvote', getUser, VotesController.votes_downvote);

router.get('/', checkAuth, VotesController.get_votes);

module.exports = router;