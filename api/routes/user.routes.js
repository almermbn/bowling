'use strict';
module.exports = function(app) {
	var user = require('../controllers/user.controller');
	// messages Routes
	app.route('/api/register').post(user.register_user);
	app.route('/api/login').post(user.login_user);
	app.route('/api/test').get(user.test);
};