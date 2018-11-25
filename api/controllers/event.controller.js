'use strict';
var mongoose = require('mongoose'),
Event = mongoose.model('Event');

exports.create_event = function(req, res) {
	

    var eventModel = new Event(req.body);

    eventModel.save(function(err, msg) {
        if (err){
            res.send(err);
        }

        var response = {
            saveOk: true,
            message: 'Evento criado com sucesso!'
        }

        res.json( response );
    });

};

exports.list_events = function(req, res) {
};