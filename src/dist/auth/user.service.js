'use strict';

angular.module('droneCafeApp.auth')
  .service('User', userService);

userService.$inject = [];
function userService() {
  this.name = null;
  this.email = null;
  this.balance = 0;

  this.upBalance = function(number) {
    this.balance += number;
  }

  this.downBalance = function(number) {
    this.balance -= number;
  }

  this.set = function(params) {
    this.name = params.name || null;
    this.email = params.email || null;
    this.balance = params.balance || 0;
  }

  this.check = function() {
    return !!this.email;
  }

  this.clear = function() {
    this.name = null;
    this.email = null;
    this.balance = 0;
  }
}