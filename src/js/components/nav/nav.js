/**
 * @Author:      xd.zang
 * @DateTime:    2016-03-28
 * @description: nav指令配置
 */

import './nav.css';
import nav from './nav.ctrl.js'

let app = () => {
  return {
    template: require('./nav.html'),
    restrict: 'AE'
  }
};
nav.directive('nav', app);

export default nav;
