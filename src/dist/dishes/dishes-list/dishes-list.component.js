'use strict';

angular
	.module('droneCafeApp.dishes')
	.component('dishesList', {
		templateUrl: '/dishes/dishes-list/dishes-list.component.html',
		controller: DishesListController,
		bindings: {
			dishes: "=",
			view: "=",
			onStart: "&",
			onSuccess: "&"
		}
	});

DishesListController.$inject = [];
function DishesListController() {
	var ctrl = this;

	ctrl.start = function(item) {
		ctrl.onStart({item: item});
	}

	ctrl.success = function(item) {
		ctrl.onSuccess({item: item});
	}
}