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
	preferences: {
		type: Object
	},
	name: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    level: {
        type: Number
    }
    //level
    //90 admin
    //10 normal user
});
module.exports = mongoose.model('User', userChma);
