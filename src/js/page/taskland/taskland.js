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
       })
       .state('todoList', {
         url: '/todoList',
         views: {
           app: {
             templateUrl: './taskland/todoList.html'
           }
         }
       })
       .state('attentionList', {
         url: '/attentionList',
         views: {
           app: {
             templateUrl: './taskland/attentionList.html'
           }
         }
       })
       .state('partakeList', {
         url: '/partakeList',
         views: {
           app: {
             templateUrl: './taskland/partakeList.html'
           }
         }
       })
       .state('responsibleList', {
         url: '/responsibleList',
         views: {
           app: {
             templateUrl: './taskland/responsibleList.html'
           }
         }
       })
       ;
   });

 tasklandModule.controller('collapseCtrl', ($scope) => {
    $scope.delayList = false;
    $scope.duetodayList = false;
    $scope.otherdueList = false;
 });
tasklandModule.controller('paginationCtrl', function ($scope, $log) {
  $scope.totalItems = 99;
  $scope.currentPage = 1;

  $scope.setPage = function (pageNo) {
    $scope.currentPage = pageNo;
  };

  $scope.pageChanged = function() {
    $log.log('Page changed to: ' + $scope.currentPage);
  };

  $scope.maxSize = 5; //最大显示页数
  $scope.bigTotalItems = 175;// 跟totalItems差不多最大记录数
  $scope.bigCurrentPage = 1;// 默认显示第几页
});

 export default tasklandModule;
