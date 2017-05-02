const mongoose = require('mongoose');
const UserSchema = require('../User.schema');

let userManager = {
	getByEmail: function(email) {
		return new Promise(function(resolve, reject) {
			UserSchema.findOne({email : email} , function(error, found) {
				if(error) reject(error);
				else {
					resolve(found);
				}
			})
		});
	}
};

module.exports = userManager;