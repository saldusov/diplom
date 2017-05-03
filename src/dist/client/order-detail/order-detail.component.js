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

	ctrl.reloadOrders();
}
