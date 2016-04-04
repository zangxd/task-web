/**
 * @Author:      xd.zang
 * @DateTime:    2016-04-03
 * @description: 任务田主界面 ctrl
 */

 import './taskland.css';

 let tasklandModule = angular.module('taskland', [
     'ui.router','ui.bootstrap'
   ])
   .config(($stateProvider) => {
     $stateProvider
       .state('taskland', {
         url: '/taskland',
         views: {
           app: {
             templateUrl: './taskland/taskland.html'
           }
         }
       });
   });

 tasklandModule.controller('collapseCtrl', ($scope) => {
    $scope.isCollapsed = true;
 });

 export default tasklandModule;
