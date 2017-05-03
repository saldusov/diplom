'use strict';

angular
	.module('droneCafeApp', [
		'droneCafeApp.auth',
    'droneCafeApp.client',
		'droneCafeApp.kitchen',
		'droneCafeApp.shared',
		'ngMaterial',
		'ngMessages'
	])
	.config(configApp)
	.run(runApp);

configApp.$inject = ["$stateProvider", "$urlRouterProvider", "$locationProvider"];
function configApp($stateProvider, $urlRouterProvider, $locationProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      abstract: true,
      template: '<drone-cafe-app/>'
    });

  $urlRouterProvider.when('', '/');
  $locationProvider.html5Mode(true);
}

runApp.$inject = ['$rootScope', '$state', '$stateParams', 'SessionService'];
function runApp($rootScope, $state, $stateParams, SessionService) {
	$rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    $rootScope.user = null;

    // Здесь мы будем проверять авторизацию
    $rootScope.$on('$stateChangeStart',
      function (event, toState, toParams, fromState, fromParams) {
        SessionService.checkAccess(event, toState, toParams, fromState, fromParams);
      }
    );
}