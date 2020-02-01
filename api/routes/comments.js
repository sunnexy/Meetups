const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const getUser = require('../middleware/getUser');
const jwt = require('jsonwebtoken');

const CommentsController = require('../controllers/comments');

router.post('/', checkAuth, CommentsController.comments_create);

module.exports = router;