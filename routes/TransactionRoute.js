var express = require('express');
var router = express.Router();
var TransactionController = require('../controllers/TransactionController.js');
var UserController = require('../controllers/UserController.js');

/*
 * GET
 */
router.get('/', UserController.loginRequired,  TransactionController.list);

/*
 * GET
 */
router.get('/:id', UserController.loginRequired,  TransactionController.show);

/*
 * POST
 */
router.post('/', UserController.loginRequired, TransactionController.create);

/*
 * PUT
 */
router.put('/:id', UserController.loginRequired, TransactionController.update);

/*
 * DELETE
 */
router.delete('/:id', UserController.loginRequired, TransactionController.remove);

module.exports = router;
