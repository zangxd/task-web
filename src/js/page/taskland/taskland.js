/**
 * @Author:      xd.zang
 * @DateTime:    2016-04-03
 * @description: 任务田主界面 ctrl
 */

 import './taskland.css';

 let tasklandModule = angular.module('taskland', [
     'ui.router','ui.bootstrap','ngAnimate'
   ])
   .config(($stateProvider, $urlRouterProvider) => {
     $urlRouterProvider.otherwise('/');
     $stateProvider
       .state('taskland', {
         url: '/',
         views: {
           app: {
             templateUrl: './taskland/taskland.html'
           }
         }
       });
   });

 tasklandModule.controller('collapseCtrl', ($scope) => {
    $scope.delayList = false;
    $scope.duetodayList = false;
    $scope.otherdueList = false;
 });

 export default tasklandModule;
