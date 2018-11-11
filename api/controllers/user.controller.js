'use strict';
var mongoose = require('mongoose'),
User = mongoose.model('User');

exports.register_user = function(req, res) {
    var userDoc = {
        user : req.body.user,
        pwd : req.body.pwd,
    }
    
    var userModel = new User(userDoc);

    User.find({ user: req.body.user }, null, null, function (err, docs) {
        if (err){
            res.send(err);
        }

        var response = {
            saveOk: true,
            message: ''
        }

        if(docs.length){
            response.saveOk = false;
            response.message = 'Este usuário já existe';
        } else {
            userModel.save(function(err, msg) {
                if (err){
                    res.send(err);
                }
            });
        }

        res.json( response );
    });
    
};
exports.login_user = function(req, res) {
    
    var userDoc = {
        user : req.body.user,
        pwd : req.body.pwd,
    }

    var userModel = new User(userDoc);

    User.find(userDoc, function (err, docs) {
        if (err){
            res.send(err);
        }

        var userResponse = {
            saveOk: true,
            message: ''
        }

        if(docs.length){
            userResponse.message = 'Bem Vindo ' + userDoc.user;
        } else {
            userResponse.saveOk = false;
            userResponse.message = 'Usuário ou senha inválidos';
        }

        res.json( userResponse );
    });
};