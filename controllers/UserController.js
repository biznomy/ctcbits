var UserModel = require('../models/UserModel.js');
var jsonwebtoken = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var _random = require('../utils/random');
/**
 * UserController.js
 *
 * @description :: Server-side logic for managing Users.
 */
var UserController = {

    /**
     * UserController.list()
     */
    list: function (req, res) {
        UserModel.find(req.query, function (err, Users) {
            if (err) {
                return res.status(500).json({
                    message: err.message,
                    error: err
                });
            }
            return res.json(Users);
        });
    },

    /**
     * UserController.show()
     */
    show: function (req, res) {
        UserModel.findById(req.params.id, function (err, User) {
            if (err) {
                return res.status(500).json({
                    message: err.message,
                    error: err
                });
            }
            return res.json(User);
        });
    },

    /**
     * UserController.create()
     */
    // create: function (req, res) {

    //     var User = new UserModel(req.body);

    //     User.save(function (err, User) {
    //         if (err) {
    //             return res.status(500).json({
    //                 message: err.message,
    //                 error: err
    //             });
    //         }
    //         return res.status(201).json(User);
    //     });
    // },

    /**
     * UserController.update()
     */
    update: function (req, res) {
        UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, User) {
            if (err) {
                return res.status(500).json({
                    message: err.message,
                    error: err
                });
            }

            return res.json(User);
        });
    },

    /**
     * UserController.remove()
     */
    remove: function (req, res) {
        UserModel.findByIdAndRemove(req.params.id, function (err, User) {
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
     * UserController.register()
     */
    register: function (req, res) {

        var newUser = new UserModel(req.body);
        newUser.password = bcrypt.hashSync(req.body.password, 10);
        UserController._randomUserID().then(USR_ID=>{
            newUser.username =  USR_ID;
            newUser.save(function (err, user) {
                if (err) {
                    return res.status(400).send({ message: err });
                } else {
                    user.password = undefined;
                    user.role = undefined;
                    return res.json(user);
                }
            });
        });        
    },

    /**
     * UserController.signIn()
     */
    signIn: function (req, res) {
        UserModel.findOne({ username: req.body.username }, function (err, user) {
            if (err) { throw err };
            if (!user) {
                res.status(401).json({ message: 'Athentication failed. User not found' });
            } else if (user) {
                if (!user.comparePassword(req.body.password)) {
                    res.status(401).json({ message: 'Authentication failed. Wrong password.' });
                } else {
                    res.status(200).json({ token: jsonwebtoken.sign({ email: user.email, username: user.username, _id: user._id }, 'SALT_KEY') });
                }
            }
        });
    },

    /**
     * UserController.loginRequired()
     */
    loginRequired: function (req, res, next) {
        if (req.user) {
            next();
        } else {
            res.status(401).json({ message: 'Unauthorised user !' });
        }
    },

    /**
     * UserController._randomUserID()
     */
    _randomUserID: function () {
        return new Promise((resolve, reject) => {
            var CCBITS = 'CT' + _random._Number(6);
            UserModel.findOne({ username: CCBITS }, function (err, Users) {
                if (err) {
                    reject(err.message);
                }
                if (!Users) {
                    resolve(CCBITS)
                } else if (Users) {
                    getUserId();
                }
            });
        });
    }
};

module.exports = UserController;