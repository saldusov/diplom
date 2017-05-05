'use strict';

angular.module('droneCafeApp.shared')
  .directive('timeViewer', ['$compile', function ($compile) {
    return  {
      restrict: 'ECA',
      replace: false,
      scope: {
        startTimeAttr: '=startTime',
        endTimeAttr: '=endTime',
        isStoped: '=isStoped'
      },
      controller: timeViewerController,
      template: '{{hours}} ч. {{minutes}} мин. {{seconds}} сек.'
    };
  }])

timeViewerController.$inject = ['$scope', '$element', '$attrs'];
function timeViewerController($scope, $element, $attrs) {
  var diffFunc = function diff(startTime, endTime) {
    return endTime.diff(startTime);
  }
  
  var tick = function(startTimeVal, endTimeVal) {
    let startTime = moment(startTimeVal);//.tz("Europe/Moscow");
    let endTime = moment(endTimeVal);//.tz("Europe/Moscow");

    let diff = diffFunc(startTime, endTime);

    $scope.seconds = Math.floor((diff / 1000) % 60);
    $scope.minutes = Math.floor(((diff / (60 * 1000)) % 60));
    $scope.hours = Math.floor(((diff / (3600 * 1000)) % 24));
    $scope.days = Math.floor(((diff / (3600 * 1000)) / 24));

    if(!$scope.isStoped) { 
      let timer = setTimeout(() => {
        tick(startTime, new Date());

        $scope.$apply();
      }, 1000);
    }
  }

  let endTime = $scope.isStoped ? $scope.endTimeAttr : new Date();

  tick($scope.startTimeAttr, endTime);

}