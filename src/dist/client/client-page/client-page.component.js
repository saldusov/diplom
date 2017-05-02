'use strict';

angular
	.module('droneCafeApp.client')
	.component('clientPage', {
		templateUrl: 'client/client-page/client-page.component.html',
		controller: ClientPageController
	});

ClientPageController.$inject = ['User'];
function ClientPageController(User) {
	var ctrl = this;

	ctrl.user = User;
	ctrl.onUpBalance = function() {
		User.upBalance(100);
	}
}