'use strict';
module.exports = function(app) {
	var user = require('../controllers/user.controller');
	app.route('/api/register').post(user.register_user);
	app.route('/api/login').post(user.login_user);
};