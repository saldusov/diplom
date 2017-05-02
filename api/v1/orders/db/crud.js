const mongoose = require('mongoose');
const OrderSchema = require('../Order.schema');

let userManager = {
	read: function(id) {
		return new Promise(function(resolve, reject) {
			OrderSchema.findOne({_id : id} , function(error, found) {
				if(error) reject(error);
				else resolve(found);
			})
		});
	},

	create: function(data) {
		return new Promise(function(resolve, reject) {
			let user = new OrderSchema(data);
			user.save(function(error, savedObject){
				if (error) {
					reject(error);
				} else {
					if(!savedObject) {
						reject(["Не удалось сохранить заказ"]);
					} else {
						resolve(savedObject);
					}
				}
			});
		});
	},

	update: function(id, data) {
		return new Promise(function(resolve, reject) {
			OrderSchema.update({_id: id}, {$set: data}, function(error, updatedObject){
				if(error) {
					reject(error);
				} else {
					resolve(updatedObject);
				}
			});
		});
	},

	delete: function(id) {
		return new Promise(function(resolve, reject) {
			OrderSchema.remove({ _id: id }, function(error, result) {
		    	if (error) {
					reject(error);
		    	} else {
		    		if(result.result.n > 0) {
		    			resolve({status: "ok"});
		    		} else {
		    			resolve(false);
		    		}
		    	}
			});
		});
	}
};

module.exports = userManager;