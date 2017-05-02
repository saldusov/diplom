'use strict';

angular
	.module('droneCafeApp.client')
	.component('clientPage', {
		templateUrl: 'client/client-page/client-page.component.html',
		controller: ClientPageController
	});

ClientPageController.$inject = ['SessionService'];
function ClientPageController(SessionService) {
	var ctrl = this;

	ctrl.user = SessionService.getUser();
	ctrl.onUpBalance = function() {
		ctrl.user.upBalance(100);
	}
}