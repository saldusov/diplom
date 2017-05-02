angular
	.module('droneCafeApp')
	.component('droneCafeApp', {
		templateUrl: '/app/app.component.html',
		controller: AppController
	});

AppController.$inject = ['$scope', 'SessionService', '$state'];
function AppController($scope, SessionService, $state) {
	var ctrl = this;
	ctrl.title = 'Drone Cafe';
	ctrl.user = SessionService.getUser();

	ctrl.onExit = function() {
		SessionService.logout();
    	$state.transitionTo('auth.login');
	};
}