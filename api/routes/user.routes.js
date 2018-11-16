'use strict';
module.exports = function(app) {
	var user = require('../controllers/user.controller');
	app.route('/api/register').post(user.register_user);
	app.route('/api/login').post(user.login_user);
	app.route('/api/registerMatch').post(user.register_match);
	app.route('/api/getMatches').post(user.get_matches);
	app.route('/api/deleteMatches').post(user.delete_matches);
	app.route('/api/saveConfirmPreference').post(user.save_confirm_preference);
};