'use strict';

angular
  .module('droneCafeApp.kitchen', [
    'btford.socket-io',
  	'ui.router',
  	'droneCafeApp.dishes'
  ])
  .config(configKitchen);


function configKitchen($stateProvider) {
    let kitchenState = {
      name: 'home.kitchen',
      url: 'kitchen',
      template: '<kitchen/>',
      data: {
        'noLogin': true
      }
    }

    $stateProvider.state(kitchenState);
}