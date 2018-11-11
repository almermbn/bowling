'use strict';
var mongoose = require('mongoose');
var Match = mongoose.Schema;
var matchScma = new Match({
    image: {
        type: String
    }
});
module.exports = mongoose.model('Match', matchScma);