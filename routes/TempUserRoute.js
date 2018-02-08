var express = require('express');
var router = express.Router();
var TempUserController = require('../controllers/TempUserController');

/*
 * POST
 */
router.post('/request', TempUserController.request);

/*
 * POST
 */
router.post('/verify', TempUserController.verify);

module.exports = router;