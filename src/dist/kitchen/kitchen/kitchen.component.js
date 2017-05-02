'use strict';

angular
	.module('droneCafeApp.kitchen')
	.component('kitchen', {
		templateUrl: 'kitchen/kitchen/kitchen.component.html',
		controller: KitchenController
	});

KitchenController.$inject = ['DishesService'];
function KitchenController(DishesService) {
	var ctrl = this;

	ctrl.startDishes = [];

	DishesService.get()
		.then( (response) => ctrl.startDishes = response.data );

	ctrl.onStart = function(item) {
		console.log('Start', item);
	}

	ctrl.onSuccess = function(item) {
		console.log('Success', item);
	}
}