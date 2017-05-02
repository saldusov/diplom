'use strict';

angular
	.module('droneCafeApp.dishes')
	.component('dishesOrderList', {
		templateUrl: '/dishes/dishes-order-list/dishes-order-list.component.html',
		controller: DishesOrderListController,
		bindings: {
			orders: "=",
			view: "=",
			onStart: "&",
			onSuccess: "&"
		}
	});

DishesOrderListController.$inject = [];
function DishesOrderListController() {
	var ctrl = this;

	ctrl.start = function(item) {
		ctrl.onStart({item: item});
	}

	ctrl.success = function(item) {
		ctrl.onSuccess({item: item});
	}
}