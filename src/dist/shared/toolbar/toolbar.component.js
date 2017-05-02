'use strict';

angular
	.module('droneCafeApp.shared')
	.component('toolbar', {
		templateUrl: 'shared/toolbar/toolbar.component.html',
		controller: toolbarComponent,
		bindings: {
			onExit: '&',
			title: "="
		}
	});


toolbarComponent.$inject = ['$scope'];
function toolbarComponent($scope) {
	var ctrl = this;

	ctrl.exit = function() {
		ctrl.onExit();
	};
}