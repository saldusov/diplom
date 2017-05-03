'use strict';

angular
  .module('droneCafeApp.client')
  .factory('SocketOrder', function (socketFactory, SessionService) {
	  return socketFactory({
	  	ioSocket: io.connect('/order?_id='+SessionService.getUser()._id)
	  });
	});