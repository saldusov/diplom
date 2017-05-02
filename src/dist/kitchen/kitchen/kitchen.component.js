'use strict';

angular
	.module('droneCafeApp.kitchen')
	.component('kitchen', {
		templateUrl: 'kitchen/kitchen/kitchen.component.html',
		controller: KitchenController
	});

KitchenController.$inject = ['OrderService'];
function KitchenController(OrderService) {
	var ctrl = this;
	ctrl.startDishes = [];
	ctrl.readyDishes = [];

	ctrl.onStart = function(item) {
		OrderService.start(item)
			.then(() => {
				ctrl.reloadStartList();
				ctrl.reloadPrepareList();
			});
	}

	ctrl.onReady = function(item) {
		OrderService.ready(item)
			.then(() => {
				ctrl.reloadStartList();
				ctrl.reloadPrepareList();
			});
	}

	ctrl.reloadStartList = () => OrderService.get({status: 'ordered'})
		.then( (data) => ctrl.startDishes = data );

	ctrl.reloadPrepareList = () => OrderService.get({status: 'prepare'})
		.then( (data) => ctrl.readyDishes = data );

	ctrl.reloadStartList();
	ctrl.reloadPrepareList();
}