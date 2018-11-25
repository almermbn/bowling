'use strict';
module.exports = function(app) {
	var event = require('../controllers/event.controller');
	app.route('/api/createEvent').post(event.create_event);
	app.route('/api/listEvents').post(event.list_events);
};