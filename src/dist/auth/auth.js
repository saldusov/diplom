'use strict';

angular.module('droneCafeApp.auth', [
    'ui.router',
    'swxSessionStorage'
  ])
  .config(configAuthModule);

configAuthModule.$inject = ["$stateProvider", "$urlRouterProvider"];
function configAuthModule($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('auth', {
      url: '/auth',
      abstract: true,
      template: '<ui-view>'
    })
    .state('auth.login', {
      url: '/login',
      templateUrl: 'auth/login/login.component.html', 
      data: {
        'noLogin': true
      }
    });
}