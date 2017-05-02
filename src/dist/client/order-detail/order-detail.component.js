'use strict';

angular
	.module('droneCafeApp.client')
	.component('orderDetail', {
		templateUrl: 'client/order-detail/order-detail.component.html',
		controller: OrderDetailController
	});

OrderDetailController.$inject = ['OrderService', 'SessionService'];
function OrderDetailController(OrderService, SessionService) {
	var ctrl = this;
	ctrl.orders = [];

	OrderService.get({userId: SessionService.getUser()._id})
		.then((data) => ctrl.orders = data);
}
