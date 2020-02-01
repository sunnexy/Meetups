const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const getUser = require('../middleware/getUser');


const UsersController = require('../controllers/user');

router.post('/signup', UsersController.user_create);

router.post('/login', UsersController.user_login);

router.get('/data', checkAuth, getUser, UsersController.user_data);

module.exports = router;