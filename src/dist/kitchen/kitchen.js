'use strict';

angular
  .module('droneCafeApp.kitchen', ['ui.router'])
  .config(configKitchen);


function configKitchen($stateProvider) {
    let kitchenState = {
      name: 'kitchen',
      url: '/kitchen',
      template: '<h3>hello kitchen!</h3>'
    }

    $stateProvider.state(kitchenState);
}