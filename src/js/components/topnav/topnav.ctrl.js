/**
 * @Author:      xd.zang
 * @DateTime:    2016-04-03
 * @description: topnav ctrl
 */

let topnav = angular.module('topnav', ['ui.bootstrap']);

topnav.controller('topnavCtrl', ['$scope', function ($scope) {

}]);

topnav.controller('dropDownCtrl', ['$scope', function ($scope,$log) {
  $scope.status = {
    isopen: false
  };
  $scope.toggled = function(open) {
    $log.log('Dropdown is now: ', open);
  };
  $scope.toggleDropdown = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.status.isopen = !$scope.status.isopen;
  };

  $scope.appendToEl = angular.element(document.querySelector('#dropdown-long-content'));
}]);

topnav.controller('CollapseDemoCtrl', function ($scope) {
  $scope.isCollapsed = true;
});

export default topnav;
