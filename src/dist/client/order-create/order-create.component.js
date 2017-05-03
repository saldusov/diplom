'use strict';

angular
	.module('droneCafeApp.client')
	.component('orderCreate', {
		templateUrl: 'client/order-create/order-create.component.html',
		controller: OrderCreateController,
		bindings: {
			order: "="
		}
	});

OrderCreateController.$inject = ['SessionService', 'OrderService'];
function OrderCreateController(SessionService, OrderService) {
	var ctrl = this;

	ctrl.user = SessionService.getUser();

	ctrl.upBalance = function(summ) {
		ctrl.user.upBalance(summ);
	}

	ctrl.payDish = function(dish) {
		ctrl.user.downBalance(dish.price);
		OrderService.pay(dish);
	}
}
