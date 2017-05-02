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
	},

	changeStatus: function(_id, status) {
		return new Promise(function(resolve, reject) {
			OrderSchema.update({_id : _id}, {$set: {status: status}}, function(error, modifyInfo) {
				if(error) reject(error);
				else {
					resolve(modifyInfo);
				}
			})
		});
	}
};

module.exports = orderManager;