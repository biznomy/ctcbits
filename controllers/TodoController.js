var TodoModel = require('../models/TodoModel.js');

/**
 * TodoController.js
 *
 * @description :: Server-side logic for managing Todos.
 */
module.exports = {

    /**
     * TodoController.list()
     */
    list: function (req, res) {
        TodoModel.find(req.query, function (err, Todos) {
            if (err) {
                return res.status(500).json({
                    message: err.message,
                    error: err
                });
            }
            return res.json(Todos);
        });
    },

    /**
     * TodoController.show()
     */
    show: function (req, res) {
        TodoModel.findById(req.params.id, function (err, Todo) {
            if (err) {
                return res.status(500).json({
                    message: err.message,
                    error: err
                });
            }
            return res.json(Todo);
        });
    },

    /**
     * TodoController.create()
     */
    create: function (req, res) {

        var Todo = new TodoModel(req.body);

        Todo.save(function (err, Todo) {
            if (err) {
                return res.status(500).json({
                    message: err.message,
                    error: err
                });
            }
            return res.status(201).json(Todo);
        });
    },

    /**
     * TodoController.update()
     */
    update: function (req, res) {
        TodoModel.findByIdAndUpdate(req.params.id, req.body, {new : true}, function (err, Todo) {
            if (err) {
                return res.status(500).json({
                    message: err.message,
                    error: err
                });
            }     

            return res.json(Todo);
        });
    },

    /**
     * TodoController.remove()
     */
    remove: function (req, res) {
        TodoModel.findByIdAndRemove(req.params.id, function (err, Todo) {
            if (err) {
                return res.status(500).json({
                    message: err.message,
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
