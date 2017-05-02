let validation = require("./validation");

module.exports = {
	parseData: function(req, res, next) {
		let errors = [];

		if(validation(req.body, errors) && errors.length === 0) {
			next();
		} else {
			res.status(400).json({errors});
		}
	} 
}