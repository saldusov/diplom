'use strict';

angular
	.module('droneCafeApp.client')
	.component('orderDetail', {
		templateUrl: 'client/order-detail/order-detail.component.html',
		controller: OrderDetailController
	});

OrderDetailController.$inject = ['OrderService', 'SessionService', 'SocketOrder'];
function OrderDetailController(OrderService, SessionService, SocketOrder) {
	var ctrl = this;
	ctrl.orders = [];

	SocketOrder.on('change-status', function(data) {
		ctrl.reloadOrders();
	});

	ctrl.reloadOrders = () => {
		OrderService.get({userId: SessionService.getUser()._id})
			.then((data) => ctrl.orders = data);
	}

	ctrl.isPay = order => (getPriceDiscount(order.dish.price, 0.05) <= SessionService.getUser().balance);

	ctrl.getDiff = order => (getPriceDiscount(order.dish.price, 0.05) - SessionService.getUser().balance).toFixed(2);

	ctrl.isOpenOrder = (order) => {
		return (['closed', 'canceled'].indexOf(order.status) === -1);
	}

	ctrl.onCancel = (order) => {
		OrderService.cancel(order);
	}

	ctrl.onRepeat = (order) => {
		let price = getPriceDiscount(order.dish.price, 0.05);
		order.status = 'ordered';

		OrderService.update(order).then((updated) => {
			SessionService.getUser().downBalance(price);
		});
	}

	ctrl.reloadOrders();
}

function getPriceDiscount(price, discount = 0.05) {
	return (price - (price * discount)).toFixed(2);
}