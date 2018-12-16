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
            statusOk: true,
            message: 'Evento criado com sucesso!'
        }

        res.json( response );
    });

};

exports.list_events = function(req, res) {

    Event.find({ date: { $gte: new Date() } }, null, null, function (err, docs) {
        if (err){
            res.send(err);
        }

        docs.sort(function(a, b) { 
            return a.date - b.date;
        })

        var response = {
            statusOk: true,
            message: '',
            object: docs
        }

        res.json( response );
    });
};