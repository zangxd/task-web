/**
 * @Author:      xd.zang
 * @DateTime:    2016-03-28
 * @description: angular filter
 */
import './filter.css';

let filterModule = angular.module('filter', [
    'ui.router'
  ])
  .config(($stateProvider) => {
    $stateProvider
      .state('filter', {
        url: '/filter',
        views: {
          app: {
            templateUrl: './filter/filter.html'
          }
        }
      });
  });

filterModule.controller('filterCtrl', ($scope) => {

});
filterModule.filter('filterCustom', () => {
  return (item) => {
    return item + "hi!";
  };
});

export default filterModule;
