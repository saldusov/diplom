'use strict';

angular.module('droneCafeApp.dishes')
  .service('DishesService', dishesService);

dishesService.$inject = ['$http'];
function dishesService($http) {
	let menu = [];
  this.get = () => $http.get('menu.json');

  this.getById = function(id) {
  	return new Promise((resolve, reject) => {
  		if(menu.length == 0) {
  			//this.get().then(items => menu = items)
  		}
  	}); 
  }

  let findById = function(id) {
  	return this.menu.find( item => {
  		if(id === item.id) return true;
  	});
  }
}