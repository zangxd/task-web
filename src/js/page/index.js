/**
 * @Author:      xd.zang
 * @DateTime:    2016-03-24
 * @description: index页面对应的入口js文件
 */


 import 'angular';
 import 'angular-ui-router';
 import 'angular-ui-bootstrap';


 import '../../css/lib/font-awesome/css/font-awesome.min.css';
 import '../../css/common/style.css';
 import '../../css/common/skins/_all-skins.css';



 import Nav from '../components/nav/nav';
 import Route from './route/route';
 import Directive from './directive/directive';
 import Service from './service/service';
 import Filter from './filter/filter';


 import Sidebar from '../components/sidebar/sidebar';
 import Topnav from '../components/topnav/topnav';

 var App  = angular.module('AngularApp', [
     Nav.name,
     Route.name,
     Directive.name,
     Service.name,
     Filter.name,
     Sidebar.name,
     Topnav.name
 ]);
