'use strict';

angular
	.module('droneCafeApp.kitchen')
	.component('kitchen', {
		templateUrl: 'kitchen/kitchen/kitchen.component.html',
		controller: KitchenController
	});

KitchenController.$inject = ['OrderService', 'SocketKitchen'];
function KitchenController(OrderService, SocketKitchen) {
	var ctrl = this;
	ctrl.startDishes = [];
	ctrl.readyDishes = [];

	ctrl.onStart = function(item) {
		OrderService.start(item);
	}

	ctrl.onReady = function(item) {
		OrderService.ready(item);
	}

	ctrl.reloadStartList = () => OrderService.get({status: 'ordered'})
		.then( (data) => ctrl.startDishes = data );

	ctrl.reloadPrepareList = () => OrderService.get({status: 'ordered', no: true, sort: 'prepareDate'})
		.then( (data) => ctrl.readyDishes = data );

	ctrl.reloadStartList();
	ctrl.reloadPrepareList();

	SocketKitchen.on('add-order', function (data) {
		ctrl.reloadStartList();
	});

	SocketKitchen.on('change-status', function (data) {
		switch(data.status) {
			case 'prepare':
				ctrl.reloadStartList();
				ctrl.reloadPrepareList();
				break;
			case 'ready':
				ctrl.reloadPrepareList();
				break;
		}
	});
}