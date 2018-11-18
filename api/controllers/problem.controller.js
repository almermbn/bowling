'use strict';
var mongoose = require('mongoose'),
Problem = mongoose.model('Problem');

exports.report_problem = function(req, res) {
	
	var problem = {
        user : req.body.user.toLowerCase(),
        message : req.body.message,
        date: new Date()
    }
    
    var problemModel = new Problem(problem);

    problemModel.save(function(err, msg) {
        if (err){
            res.send(err);
        }

        var response = {
            saveOk: true,
            message: 'Obrigado pela colaboração!'
        }

        res.json( response );
    });

};