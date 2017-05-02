'use strict';

angular.module('droneCafeApp.auth')
  .service('SessionService', sessionService);

sessionService.$inject = ['$injector', '$sessionStorage', '$state', 'User'];
function sessionService($injector, $sessionStorage, $state, User) {

  this.login = function(user) {
    $sessionStorage.$default({
      user: user
    });

    $state.transitionTo('home.client.detail');
  }

  this.logout = function() {
    $sessionStorage.$reset();
  }

  this.checkAccess = function(event, toState, toParams, fromState, fromParams) {
    var $scope = $injector.get('$rootScope');

    if (toState.data !== undefined) {
      if (toState.data.noLogin !== undefined && toState.data.noLogin) {
        // если нужно, выполняйте здесь какие-то действия 
        // перед входом без авторизации
      }
    } else {
      // вход с авторизацией
      if ($sessionStorage.user) {
        if(!User.check()) User.set($sessionStorage.user);
        //$scope.$root.user = $sessionStorage.user;
      } else {
        // если пользователь не авторизован - отправляем на страницу авторизации
        event.preventDefault();
        $scope.$state.go('auth.login');
      }
    }
  };

  this.getUser = function() {
    return $sessionStorage.user;
  }
}