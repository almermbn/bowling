'use strict';
var mongoose = require('mongoose');
var User = mongoose.Schema;

var Matches = {
	id: mongoose.Types.ObjectId,
	rolls: Array,
	total: Number,
	date: Date
};

var userChma = new User({
    user: {
        type: String
    },
    pwd: {
        type: String
    },
    matches: {
    	type: [Matches],
    },

});
module.exports = mongoose.model('User', userChma);
