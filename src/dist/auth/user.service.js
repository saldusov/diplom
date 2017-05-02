'use strict';

angular.module('droneCafeApp.auth')
  .factory('User', userService);

userService.$inject = ['$http', 'dbUsers'];
function userService($http, dbUsers) {
  this._id = null;
  this.name = null;
  this.email = null;
  this.balance = 0;

  return {
    upBalance: function(number) {
      updateBalance(this.balance + number);
    },
    downBalance: function(number) {
      updateBalance(this.balance - number);
    },
    set: function(params) {
      this._id = params._id || null;
      this.name = params.name || null;
      this.email = params.email || null;
      this.balance = params.balance || 0;
    },
    check: function() {
      return !!this.email;
    },
    clear: function() {
      this._id = null;
      this.name = null;
      this.email = null;
      this.balance = 0;
    }
  }

  let updateBalance = (number) => dbUsers.update({_id: this._id, balance: number})
      .then((user) => this.balance = user.balance);
}