'use strict';
module.exports = function(app) {
	var problem = require('../controllers/problem.controller');
	app.route('/api/reportProblem').post(problem.report_problem);
};