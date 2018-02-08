var TempUserModel = require('../models/TempUserModel');
var UserModel = require('../models/UserModel');
var _random = require('../utils/random');
/**
 * TempUserController.js
 *
 * @description :: Server-side logic for managing TempUsers.
 */
var TempUserController = {

    /**
     * TempUserController.list()
     */
    list: function (req, res) {
        TempUserModel.find(req.query, function (err, TempUsers) {
            if (err) {
                return res.status(500).json({
                    message: err.message,
                    error: err
                });
            }
            return res.json(TempUsers);
        });
    },

    /**
     * TempUserController.show()
     */
    show: function (req, res) {
        TempUserModel.findById(req.params.id, function (err, TempUser) {
            if (err) {
                return res.status(500).json({
                    message: err.message,
                    error: err
                });
            }
            return res.json(TempUser);
        });
    },

    /**
     * TempUserController.create()
     */
    create: function (req, res) {

        var TempUser = new TempUserModel(req.body);

        TempUser.save(function (err, TempUser) {
            if (err) {
                return res.status(500).json({
                    message: err.message,
                    error: err
                });
            }
            return res.status(201).json(TempUser);
        });
    },

    /**
     * TempUserController.update()
     */
    update: function (req, res) {
        TempUserModel.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, TempUser) {
            if (err) {
                return res.status(500).json({
                    message: err.message,
                    error: err
                });
            }

            return res.json(TempUser);
        });
    },

    /**
     * TempUserController.remove()
     */
    remove: function (req, res) {
        TempUserModel.findByIdAndRemove(req.params.id, function (err, TempUser) {
            if (err) {
                return res.status(500).json({
                    message: err.message,
                    error: err
                });
            }
            return res.status(204).json();
        });
    },

    /**
     * TempUserController.verify()
     */
    verify: function (req, res) {
        var newTempUser = new TempUserModel(req.body);
        newTempUser.expiration = TempUserModel.addExpiration();
        newTempUser.save(function (err, TempUser) {
            if (err) {
                return res.status(400).send({ message: err });
            } else {
                return res.json(TempUser);
            }
        });
    },

    /**
     * TempUserController.request()
     */
    request: function (req, res) {

        UserModel.findOne({ email: req.body.email }, function (err, User) {
            if (err) { throw err };
            if (!User) {
                req.body.otp = _random._Number(6);
                req.body.expiration = new TempUserModel().addExpiration();
                TempUserController.upsert(req, res);
            } else if (User) {
                res.status(403).json({ message: 'User Already Exist.' });
            }
        });
    },
    
    /**
     * TempUserController.upsert()
     */
    upsert: function (req, res) {
        TempUserModel.findOne({ email: req.body.email }, function(err, data){
            if(err) { throw err };
            if(!data){
                TempUserController.create(req, res);
            }else if(data){
                req.params.id = data._id;
                TempUserController.update(req, res);
            }
        });
    }
};

module.exports = TempUserController;