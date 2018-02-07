var express = require('express');
var router = express.Router();
var UserController = require('../controllers/UserController.js');

/*
 * GET
 */
router.post('/login', UserController.signIn);

/*
 * POST
 */
router.post('/register', UserController.register);

module.exports = router;