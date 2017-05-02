const express = require("express");
let app = module.exports = express();

const dbCrud = require('../db/crud');
const dbOther = require('../db/other');
var nspKitchen = require('../socket/kitchen');

module.exports = {
	getOrders: (matchParams) => dbOther.get(matchParams),

	getOrderById: (id) => dbCrud.read(id),

	addOrder: (data) => {
		data.status = 'ordered';
		return dbCrud.create(data)
			.then((order) => {
				eventCreateOrder(order);
				return order;
			});
	},

	updateOrder: (id, data) => {
		dbCrud.update(id, data)
			.then((modifyInfo) => dbCrud.read(req.params.id));
	},

	changeStatusById: (id, status) => {
		if(!checkOrderStatus(status)) return Promise.reject("not valid status");
		return dbCrud.update(id, {status})
			.then((modifyInfo) => {
				eventChangeStatusOrder({_id: id, status: status});
				return modifyInfo;
			});
	}
}

function checkOrderStatus(status) {
	return ['prepare', 'ready', 'closed', 'error'].indexOf(status) !== -1 ? true : false;
}

function eventCreateOrder(order) {
	nspKitchen.emit('add-order', {order});
}

function eventChangeStatusOrder(data) {
	nspKitchen.emit('change-status', data);
}