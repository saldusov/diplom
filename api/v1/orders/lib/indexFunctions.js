const express = require("express");
let app = module.exports = express();
var drone = require('netology-fake-drone-api');

const dbCrud = require('../db/crud');
const dbOther = require('../db/other');

var nspKitchen = require('../socket/kitchen');
var nspOrder = require('../socket/order');

var indexFunction = {
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
		setDateByStatus(data);

		return dbCrud.update(id, data)
			.then((modifyInfo) => {
				if(data.status == 'ordered') {
					eventCreateOrder(data);
				}
				return dbCrud.read(id)
			});
	},

	changeStatusById: (id, status) => {
		if(!checkOrderStatus(status)) return Promise.reject("not valid status");
		var data = {status};
		setDateByStatus(data);
		return dbCrud.update(id, data)
			.then((modifyInfo) => dbCrud.read(id))
			.then((order) => {
				eventChangeStatusOrder(order);
				if(order.status == 'ready') deliveryFunction(order);
				return order;
			});
	}
};

module.exports = indexFunction;

function checkOrderStatus(status) {
	return ['prepare', 'ready', 'closed', 'error', 'canceled'].indexOf(status) !== -1 ? true : false;
}

function eventCreateOrder(order) {
	nspKitchen.emit('add-order', {order});
}

function eventChangeStatusOrder(data) {
	nspKitchen.emit('change-status', data);
	nspOrder.to(data.userId).emit('change-status', data);
}

function deliveryFunction(data) {
	drone
	  .deliver()
	  .then(() => successDelivery(data._id))
	  .catch(() => errorDelivary(data._id));
}

function successDelivery(id) {
	return indexFunction.updateOrder(id, {status: 'closed'})
		.then((order) => eventChangeStatusOrder(order))
}

function errorDelivary(id) {
	return indexFunction.updateOrder(id, {status: 'error'})
		.then((order) => eventChangeStatusOrder(order))
}

function setDateByStatus(order) {
	if(order.status == 'ordered') {
		order.readyDate = null;
		order.prepareDate = null;
	}

	if(order.status == 'prepare') order.prepareDate = new Date();
	if(order.status == 'ready') order.readyDate = new Date();
}