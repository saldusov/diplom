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
		req.mongo.sort = {sort: {createdAt: -1}};

		if(query.userId || query.status) {
			req.mongo.match.$and = [];
			if(query.userId) req.mongo.match.$and.push({ userId: query.userId });
			if(query.status && query.no === undefined) req.mongo.match.$and.push({ status: query.status });
			if(query.status && query.no) req.mongo.match.$and.push({ status: { $ne: query.status } });
		}

		if(query.sort == 'prepareDate') {
			req.mongo.sort = {sort: {prepareDate: -1}}
		}

		next();
	} 
}