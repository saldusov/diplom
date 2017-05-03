const express = require("express");
let app = module.exports = express();

const dbCrud = require('../db/crud');
const dbOther = require('../db/other');

module.exports = {
	getUserById: (id) => dbCrud.read(id),

	login: (data) => {
		return dbOther.getByEmail(data.email)
			.then((found) => {
				if(!!found) {
					return found;
				} else {
					data.balance = 100;
					return dbCrud.create(data);
				}
			});
	},

	updateUser: (id, data) => {
		dbCrud.update(id, data)
			.then((modifyInfo) => dbCrud.read(id));
	}
}