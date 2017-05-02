const mongoose = require('mongoose');
const UserSchema = require('../User.schema');

let userManager = {
	read: function(id) {
		return new Promise(function(resolve, reject) {
			UserSchema.findOne({_id : id} , function(error, found) {
				if(error) reject(error);
				else resolve(found);
			})
		});
	},

	create: function(data) {
		return new Promise(function(resolve, reject) {
			let user = new UserSchema(data);
			user.save(function(error, savedObject){
				if (error) {
					reject(error);
				} else {
					if(!savedObject) {
						reject(["Не удалось сохранить пользователя"]);
					} else {
						resolve(savedObject);
					}
				}
			});
		});
	},

	update: function(id, data) {
		return new Promise(function(resolve, reject) {
			UserSchema.update({_id: id}, {$set: data}, function(error, updatedObject){
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
			UserSchema.remove({ _id: id }, function(error, result) {
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