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

	ctrl.reloadPrepareList = () => OrderService.get({status: 'prepare'})
		.then( (data) => ctrl.readyDishes = data );

	ctrl.reloadStartList();
	ctrl.reloadPrepareList();

	SocketKitchen.on('add-order', function (data) {
		ctrl.startDishes.push(data.order);
	});

	SocketKitchen.on('change-status', function (data) {
		switch(data.status) {
			case 'prepare':
				ctrl.statusPrepareAction(data._id);
				break;
			case 'ready':
				ctrl.statusReadyAction(data._id);
				break;
		}
	});

	ctrl.statusPrepareAction = (_id) => {
		let found = ctrl.startDishes.find((item, index) => {
			if(item._id == _id) {
				ctrl.startDishes.splice(index, 1);
				return true;
			}
		});

		found.status = 'prepare';
		ctrl.readyDishes.push(found);
	};

	ctrl.statusReadyAction = (_id) => ctrl.readyDishes.find((item, index) => {
		if(item._id == _id) {
			ctrl.readyDishes.splice(index, 1);
			return true;
		}
	});
}