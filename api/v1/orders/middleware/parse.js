let validation = require("./validation");

module.exports = {
	parseData: function(req, res, next) {
		let errors = [];

		if(validation(req.body, errors) && errors.length === 0) {
			next();
		} else {
			res.status(400).json({errors});
		}
	},
	parseQuery: function(req, res, next) {
		let query = req.query;
		req.mongo = {
			match: {}
		};

		if(query.userId || query.status) {
			req.mongo.match.$and = [];

			if(query.userId) req.mongo.match.$and.push({ userId: query.userId });
			if(query.status) req.mongo.match.$and.push({ status: query.status });
		}

		next();
	} 
}