var express = require('express');
var router = express.Router();
var UserController = require('../controllers/UserController');
var TempUserController = require('../controllers/TempUserController');

/*
 * GET
 */
router.get('', TempUserController.forgotPassword);

/*
 * POST
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

/*
 * update password
 */
router.post('/changepassword', TempUserController.changepassword);


module.exports = router;