'use strict';

angular.module('droneCafeApp.shared')
  .directive('timeViewer', ['$compile', function ($compile) {
    return  {
      restrict: 'ECA',
      replace: false,
      scope: {
        startTimeAttr: '=startTime',
        endTimeAttr: '=endTime'
      },
      controller: timeViewerController,
      template: '{{hours}} ч. {{minutes}} мин. {{seconds}} сек.'
    };
  }])

timeViewerController.$inject = ['$scope', '$element', '$attrs'];
function timeViewerController($scope, $element, $attrs) {
  let diff = moment($scope.endTimeAttr).diff(moment($scope.startTimeAttr));
  
  $scope.seconds = Math.floor((diff / 1000) % 60);
  $scope.minutes = Math.floor(((diff / (60 * 1000)) % 60));
  $scope.hours = Math.floor(((diff / (3600 * 1000)) % 24));
  $scope.days = Math.floor(((diff / (3600 * 1000)) / 24));
}