'use strict';

angular.module('droneCafeApp.auth')
  .service('SessionService', sessionService);

sessionService.$inject = ['$injector', '$sessionStorage', '$state', 'User', 'dbUsers'];
function sessionService($injector, $sessionStorage, $state, User, dbUsers) {

  let _user = User;

  this.login = function(user) {
    dbUsers.login(user)
      .then((item) => {
        _user.set(item);
       
        $sessionStorage.put('userid', _user._id);

        $state.go('home.client.detail');
      });
  }

  this.logout = function() {
    $sessionStorage.empty();
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
        //console.log($sessionStorage);
      if ($sessionStorage.get('userid')) {
        if(!_user.check()) {
          dbUsers.get($sessionStorage.get('userid'))
            .then( user => _user.set(user));
        }
      } else {
        // если пользователь не авторизован - отправляем на страницу авторизации
        event.preventDefault();
        $scope.$state.go('auth.login');
      }
    }
  };

  this.getUser = function() {
    return _user;
  }
}