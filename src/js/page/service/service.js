/**
 * @Author:      xd.zang
 * @DateTime:    2016-03-29
 * @description: angular service
 */
import './service.css';

let serviceModule = angular.module('service', [
    'ui.router'
  ])
  .config(($stateProvider) => {
    $stateProvider
      .state('service', {
        url: '/service',
        views: {
          app: {
            templateUrl: './service/service.html'
          }
        }
      });
  });

// $http service
serviceModule.controller('loadDataCtrl', ($scope, $http) => {
  $http({
    method: 'GET',
    url: './service/data.json'
  }).success((data, status, headers, config) => {
    console.log("success...");
    $scope.userList = data;
  }).error((data, status, headers, config) => {
    console.log("error...");
  });
});

// 自定义sevice
serviceModule.factory('userListService', ($http) => {
  let doRequest = (username, path) => {
    return $http({
      method: 'GET',
      url: './service/user.json'
    });
  };
  return {
    userList: function(username) {
      return doRequest(username, 'userList');
    }
  };
});
serviceModule.controller('serviceCtrl', ($scope, $timeout, $http, userListService) => {
  let timeout;
  $scope.$watch('username', (newUserName) => {
    if (newUserName) {
      if (timeout) {
        $timeout.cancel(timeout);
      }
      // 防抖动处理函数
      timeout = $timeout(() => {
        userListService.userList(newUserName)
          .success((data, status) => {
            $scope.userList = data;
          }).error(() => {

          });
      }, 350);
    }
  });
});

export default serviceModule;
