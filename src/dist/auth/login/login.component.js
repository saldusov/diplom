angular.module('droneCafeApp.auth')
  .controller('LoginComponent', loginComponent);

loginComponent.$inject = ["$scope", "SessionService"];
function loginComponent($scope, SessionService) {
  var as = this;

  $scope.submit = function (user, valid) {
    if(valid) {
      SessionService.login(user);
    }
  };
}