'use strict';
var mongoose = require('mongoose');
var Event = mongoose.Schema;
var eventSchma = new Event({
	name: {
	    type: String
	},
	time: {
	    type: String
	},
	date: {
	    type: Date
	},
	local: {
	    type: String
	},
	localCoordinates: {
	    type: Object
	},
	price: {
	    type: String
	},
	min: {
	    type: Number
	},
	max: {
	    type: Number
	},
	description: {
	    type: String
	},
	owner: {
		type: String
	}
});
module.exports = mongoose.model('Event', eventSchma);