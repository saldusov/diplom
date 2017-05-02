'use strict';

angular
  .module('droneCafeApp.kitchen')
  .factory('SocketKitchen', function (socketFactory) {
	  return socketFactory({
	  	ioSocket: io.connect('/kitchen')
	  });
	});