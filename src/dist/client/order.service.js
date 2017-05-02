'use strict';

angular.module('droneCafeApp.client')
  .service('OrderService', orderService);

orderService.$inject = ['$http', 'SessionService'];
function orderService($http, SessionService) {
	let base_url = '/api/v1/orders';
	let orders = [];

  this.get = (params) => $http.get(base_url, {params})
  .then((response) => response.data);

  this.pay = (item) => {
  	let order = {
			userId: SessionService.getUser()._id,
			goodId: item.id
  	};
 
  	return $http.post(base_url, order)
  		.then((response) => response.data);
  }

  this.start = item => {
    return this.changeStatus(item._id, 'prepare');
  }

  this.ready = item => {
    return this.changeStatus(item._id, 'ready');
  }

  this.update = item => $http.put(base_url + '/' + item._id, item)
    .then((response) => response.data);

  this.changeStatus = (id, status) => $http.post(base_url + '/' + id + '/' + status)
    .then((response) => response.data.status);
}