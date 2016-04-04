/**
 * @Author:      xd.zang
 * @DateTime:    2016-04-03
 * @description: topnav
 */

import './topnav.css';
import topnav from './topnav.ctrl.js'

let app = () => {
  return {
    template: require('./topnav.html'),
    restrict: 'AE'
  }
};
topnav.directive('topnav', app);

export default topnav;
