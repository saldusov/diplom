'use strict';

angular.module('droneCafeApp.auth')
  .service('dbUsers', dbUsersService);

dbUsersService.$inject = ['$http'];
function dbUsersService($http) {
  let base_url = '/api/v1/users';

  this.login = body => $http.post(base_url + '/login', body)
    .then(response => response.data);

  this.get = _id => $http.get(base_url + '/' + _id)
    .then(response => response.data);

  this.update = body => $http.put(base_url + '/' + body._id, body)
    .then(response => response.data);
}