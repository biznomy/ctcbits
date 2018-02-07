var express = require('express');
var router = express.Router();
var TodoController = require('../controllers/TodoController.js');
var UserController = require('../controllers/UserController.js');

/*
 * GET
 */
router.get('/', UserController.loginRequired,  TodoController.list);

/*
 * GET
 */
router.get('/:id', UserController.loginRequired,  TodoController.show);

/*
 * POST
 */
router.post('/', UserController.loginRequired, TodoController.create);

/*
 * PUT
 */
router.put('/:id', UserController.loginRequired, TodoController.update);

/*
 * DELETE
 */
router.delete('/:id', UserController.loginRequired, TodoController.remove);

module.exports = router;
