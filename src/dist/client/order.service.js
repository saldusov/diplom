'use strict';

angular.module('droneCafeApp.client')
  .service('OrderService', orderService);

orderService.$inject = ['$http', 'User'];
function orderService($http) {
	let orders = [];

  this.getOrders = () => orders;

  this.pay = (item) => {
  	item.datePurchase = new Date();
  	item.status = 'ordered';

  	//item.userId = User._id;
 
  	orders.push(item);
  } 
}