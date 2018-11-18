'use strict';
var mongoose = require('mongoose');
var Problem = mongoose.Schema;
var problemScma = new Problem({
    message: {
        type: String
    },
    user: {
    	type: String
    },
    date: {
    	type: Date
    }
});
module.exports = mongoose.model('Problem', problemScma);