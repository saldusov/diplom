'use strict';

angular
	.module('droneCafeApp.client')
	.component('orderDetail', {
		templateUrl: 'client/order-detail/order-detail.component.html',
		controller: OrderDetailController
	});

OrderDetailController.$inject = ['User', 'OrderService', '$timeout'];
function OrderDetailController(User, OrderService, $timeout) {
	var ctrl = this;
	
	ctrl.orders = OrderService.getOrders();
	console.log(OrderService.getOrders());
}
