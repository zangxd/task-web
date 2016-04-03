/**
 * @Author:      xd.zang
 * @DateTime:    2016-03-29
 * @description: angular route
 */
import './route.css';

let routeModule = angular.module('route', [
    'ui.router'
  ])
  .config(($stateProvider) => {
    $stateProvider
      .state('route', {
        url: '/route',
        views: {
          app: {
            templateUrl: './route/route.html'
          },
          'topbar@route': {
            templateUrl: './route/topbar.html'
          },
          'main@route': {
            templateUrl: './route/home.html'
          }
        }
      })
      .state('route.usermng', {
        url: '/usermng',
        views: {
          'main@route': {
            templateUrl: './route/usermng.html',
            controller: ($scope, $state) => {
              $scope.addUserType = () => {
                $state.go("route.usermng.addusertype");
              }
            }
          }
        }
      })
      .state('route.usermng.highendusers', {
        url: '/highendusers',
        templateUrl: './route/highendusers.html'
      })
      .state('route.usermng.normalusers', {
        url: '/normalusers',
        templateUrl: './route/normalusers.html'
      })
      .state('route.usermng.lowusers', {
        url: '/lowusers',
        templateUrl: './route/lowusers.html'
      })
      .state('route.usermng.addusertype', {
        url: '/addusertype',
        templateUrl: './route/addusertypeform.html',
        controller: ($scope, $state) => {
          $scope.backToPrevious = () => {
            window.history.back();
          }
        }
      })
      .state('route.permission', {
        url: '/permission',
        views: {
          'main@route': {
            template: '这里是权限管理'
          }
        }
      })
      .state('route.report', {
        url: '/report',
        views: {
          'main@route': {
            template: '这里是报表管理'
          }
        }
      })
      .state('route.settings', {
        url: '/settings',
        views: {
          'main@route': {
            template: '这里是系统设置'
          }
        }
      });
  });
// 控制器
routeModule.controller('routeCtrl', ($scope) => {});
export default routeModule;
