'use strict';
var mongoose = require('mongoose'),
User = mongoose.model('User');

exports.register_user = function(req, res) {
    var userDoc = {
        user : req.body.user.toLowerCase(),
        pwd : req.body.pwd,
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email
    }
    
    var userModel = new User(userDoc);

    User.find({ user: req.body.user.toLowerCase() }, null, null, function (err, docs) {
        if (err){
            res.send(err);
        }

        var response = {
            statusOk: true,
            message: ''
        }

        if(docs.length){
            response.statusOk = false;
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
        user : req.body.user.toLowerCase(),
        pwd : req.body.pwd,
    }

    var userModel = new User(userDoc);

    User.find(userDoc, function (err, docs) {
        if (err){
            res.send(err);
        }

        var userResponse = {
            statusOk: true,
            message: ''
        }

        if(docs.length){
            userResponse.object = docs[0];
            userResponse.message = 'Bem Vindo ' + docs[0].name;
        } else {
            userResponse.statusOk = false;
            userResponse.message = 'Usuário ou senha inválidos';
        }

        res.json( userResponse );
    });
};

exports.register_match = function(req, res) {

    var user = req.body.user;
    delete req.body.user;

    User.findOneAndUpdate({ user: user }, { $push: { matches: req.body } }, function (err, docs) {
        if (err){
            res.send(err);
        }

        var response = {
            statusOk: true,
            message: 'Partida salva!'
        }

        res.json( response );
    });
};

exports.get_matches = function(req, res) {

    var user = req.body.user;

    User.find({ user: user }, null, null, function (err, docs) {
        if (err){
            res.send(err);
        }

        docs[0].matches.sort(function(a, b) { 
            return a.date - b.date;
        })

        var response = {
            statusOk: true,
            message: '',
            object: docs[0].matches
        }

        res.json( response );
    });
};

exports.delete_matches = function(req, res) {

    var user = req.body.user;

    User.findOneAndUpdate({ user: user }, {  matches: [] }, function (err, docs) {
        if (err){
            res.send(err);
        }

        var response = {
            statusOk: true,
        }

        res.json( response );
    });
};
exports.save_confirm_preference = function(req, res) {

    var user = req.body.user;

    User.findOneAndUpdate({ user: user }, {  'preferences.askConfirmation': req.body.askConfirmation }, {new: true}, function (err, docs) {
        if (err){
            res.send(err);
        }

        var response = {
            statusOk: true,
            object: docs
        }

        res.json( response );
    });
};