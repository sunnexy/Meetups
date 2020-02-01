const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const getUser = require('../middleware/getUser');
const jwt = require('jsonwebtoken');

const QuestionsController = require('../controllers/questions');


router.post('/', checkAuth, getUser, QuestionsController.questions_create);

router.get('/:questionId', checkAuth, QuestionsController.questions_get);

router.patch('/:questionId/upvote', getUser, checkAuth, QuestionsController.votes_upvote);

router.patch('/:questionId/downvote', getUser, QuestionsController.votes_downvote);



module.exports = router;