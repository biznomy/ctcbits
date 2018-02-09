var express = require('express');
var router = express.Router();
var UserController = require('../controllers/UserController');
var TempUserController = require('../controllers/TempUserController');

/*
 * GET
 */
router.post('/login', UserController.signIn);

/*
 * POST
 */
router.post('/request', TempUserController.request);

/*
 * POST
 */
router.post('/register', TempUserController.verify);


module.exports = router;