const mongoose = require('mongoose');
const OrderSchema = require('../Order.schema');

let orderManager = {
	get: function(match) {
		return new Promise(function(resolve, reject) {
			OrderSchema.find(match, function(error, foundItems) {
				if(error) reject(error);
				else {
					resolve(foundItems);
				}
			})
		});
	}
};

module.exports = orderManager;