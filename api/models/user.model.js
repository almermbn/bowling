'use strict';
var mongoose = require('mongoose');
var User = mongoose.Schema;
var userChma = new User({
    user: {
        type: String
    },
    pwd: {
        type: String
    }
});
module.exports = mongoose.model('User', userChma);