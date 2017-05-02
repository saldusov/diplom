'use strict';

angular
	.module('droneCafeApp.client', [
    	'droneCafeApp.dishes',
    	'timer'
    ])
	.config(configClient);

configClient.$inject = ["$stateProvider", "$urlRouterProvider"];
function configClient($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('home.client', {
	      url: '',
	      abstract: true,
	      template: '<client-page/>'
	    })
	    .state('home.client.detail', {
	      url: '',
	      template: '<order-detail/>'
	    })
	    .state('home.client.addorder', {
	    	url: 'addorder',
	    	template: '<order-create/>'
	    })
}