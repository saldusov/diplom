'use strict';

angular
	.module('droneCafeApp.client')
	.component('accountInfo', {
		templateUrl: 'client/account-info/account-info.component.html',
		controller: AccountInfoController,
		bindings: {
			user: "=",
			onUpBalance: "&"
		}
	});

AccountInfoController.$inject = [];
function AccountInfoController() {
	var ctrl = this;

	ctrl.upBalance = function() {
		ctrl.onUpBalance();
	}
}