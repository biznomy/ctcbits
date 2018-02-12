var express = require('express');
var router = express.Router();
var UserController = require('../controllers/UserController');
var TempUserController = require('../controllers/TempUserController');


/*
 * POST
 */
router.post('/request', TempUserController.request);

/*
 * POST
 */
router.post('/register', TempUserController.verify);

/*
 * POST
 */
router.post('/login', UserController.signIn);

/*
 * update password
 */
router.post('/changepassword', TempUserController.changepassword);

/*
 * GET
 */
router.get('/fetch', TempUserController.forgotPassword);

/*
 * GET
 */
router.get('/user/all', UserController.loginRequired, UserController.isAdmin, UserController.list);

module.exports = router;