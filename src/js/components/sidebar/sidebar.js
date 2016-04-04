/**
 * @Author:      xd.zang
 * @DateTime:    2016-04-03
 * @description: 左边菜单指令配置
 */

import './sidebar.css';
import sidebar from './sidebar.ctrl.js'

let app = () => {
  return {
    template: require('./sidebar.html'),
    restrict: 'AE'
  }
};
sidebar.directive('sidebar', app);

export default sidebar;
