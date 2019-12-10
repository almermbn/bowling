'use strict';
var nodemailer = require('nodemailer');
var mongoose = require('mongoose'),
Email = mongoose.model('Email');

exports.send_email = function(req, res) {
	
    var eventModel = new Email(req.body);

    var response = {
        statusOk: true,
        object: eventModel,
        message: 'Mensagem enviada com sucesso!'
    }

    var transporter = nodemailer.createTransport({
    service: 'gmail',
        auth: {
            user: 'expressomaktub2019@gmail.com',
            pass: 'maktub2019'
        }
    });

    var mailOptions = {
        from: 'expressomaktub2019@gmail.com',
        to: eventModel.email,
        subject: 'Contato: ' + eventModel.name + ' ' + eventModel.lastName,
        text: eventModel.description
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    res.json( response );
};

