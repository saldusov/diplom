'use strict';

angular.module('droneCafeApp.auth')
  .service('User', userService);

userService.$inject = ['$http', 'dbUsers'];
function userService($http, dbUsers) {
  this._id = null;
  this.name = null;
  this.email = null;
  this.balance = 0;

  this.upBalance = (number) => {
    updateBalance(this.balance + number);
  };

  this.downBalance = (number) => {
    updateBalance(this.balance - number);
  };

  this.set = (params) => {
    this._id = params._id || null;
    this.name = params.name || null;
    this.email = params.email || null;
    this.balance = params.balance || 0;
  };

  this.check = () => {
    return !!this.email;
  };

  this.clear = () => {
    this._id = null;
    this.name = null;
    this.email = null;
    this.balance = 0;
  };;

  let updateBalance = number => dbUsers.update({_id: this._id, balance: number})
      .then((user) => this.balance = user.balance);
}