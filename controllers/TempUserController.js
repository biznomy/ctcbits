var TempUserModel = require('../models/TempUserModel');
var UserModel = require('../models/UserModel');
var UserController = require('../controllers/UserController');
var _random = require('../utils/random');
var nodemailer = require('../utils/nodemailer');
var bcrypt = require('bcrypt');

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
            TempUser.otp = undefined;
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

            TempUser.otp = undefined;
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

        TempUserModel.findOne({ email: req.body.email }, function (err, TempUser) {
            if (err) throw err;
            if(TempUser && req.body.otp == TempUser.otp){
                UserController.register(req, res);
            }else{
                return res.status(400).json("Invalid Credentials: otp"); 
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
            var mailOptions = nodemailer.mailOptions;
            mailOptions.to = req.body.email;
            mailOptions.text = "OTP Value : " + req.body.otp;
            nodemailer.mailSender(mailOptions);
        });
    },

    forgotPassword : function(req, res) {
        
        UserModel.findOne({ email: req.query.email }, function (err, User) {
            if (err) { throw err };
            if (User) {
                req.body.otp = _random._Number(6);
                req.body.expiration = new TempUserModel().addExpiration();
                req.body.email = req.query.email;
                TempUserController.upsert(req, res);
                // res.status(200).json({ message: 'Mail Send' });
           } else if (!User) {
               res.status(401).json({ message: 'User Not Exist.' });
           }
        });

    },

    changepassword : function(req, res){

        TempUserModel.findOne({ email: req.body.email }, function (err, TempUser) {
            if (err) throw err;
            if(TempUser && req.body.otp == TempUser.otp){
                // UserController.register(req, res);
                UserModel.findOne({ email: req.body.email }, function(err, User){
                    if(err) throw err;
                    if(User){
                        User.password = bcrypt.hashSync(req.body.password, 10);
                        User.save();
                        return res.status(200).json("Password Changed Successfully"); 
                    }
                });
            }else{
                return res.status(400).json("Invalid Credentials: otp"); 
            }
        });

    }
    
};

module.exports = TempUserController;