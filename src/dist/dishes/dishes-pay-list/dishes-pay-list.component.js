'use strict';

angular
	.module('droneCafeApp.dishes')
	.component('dishesPayList', {
		templateUrl: '/dishes/dishes-pay-list/dishes-pay-list.component.html',
		controller: DishesPayListController,
		bindings: {
			balance: "=",
			onUpBalance: "&",
			onPay: "&"
		}
	});

DishesPayListController.$inject = ['DishesService', '$http'];
function DishesPayListController(DishesService, $http) {
	var ctrl = this;
	ctrl.dishes = [];

	DishesService.get()
		.then(function(response) {
	        ctrl.dishes = response.data;
	    });

	ctrl.isPay = item => (item.price <= ctrl.balance);
		
	ctrl.upBalance = function(item) {
		//console.log(item.price, ctrl.balance, item.price - ctrl.balance);
		let summ = item.price - ctrl.balance;
		ctrl.onUpBalance({value: summ});
	}

	ctrl.pay = function(item) {
		ctrl.onPay({item: item});
	}
}