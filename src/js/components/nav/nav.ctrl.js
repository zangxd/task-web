/**
 * @Author:      xd.zang
 * @DateTime:    2016-03-28
 * @description: nav ctrl
 */

let nav = angular.module('nav', []);

nav.controller('navCtrl', ['$scope', function ($scope) {
    $scope.links = ['route','directive','service','filter'];
}]);

module.exports = nav;

// export default navbar;
// ES6单元测试试有问题所以改用了module.exports = navbar;写法
