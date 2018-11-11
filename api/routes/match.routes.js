'use strict';
module.exports = function(app) {
	var match = require('../controllers/match.controller');
	app.route('/api/analyzeDocument').post(match.analyze_document);
};