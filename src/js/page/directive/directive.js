/**
 * @Author:      xd.zang
 * @DateTime:    2016-03-28
 * @description: angular directive
 */
import './directive.css';

let directiveModule = angular.module('directive', [
    'ui.router'
  ])
  .config(($stateProvider) => {
    $stateProvider
      .state('directive', {
        url: '/directive',
        views: {
          app: {
            templateUrl: './directive/directive.html'
          }
        }
      });
  });

directiveModule.controller('directiveCtrl', ($scope) => {
  $scope.loadData = () => {
    console.log("加载数据中1....");
  };
});


directiveModule.directive('hi', () => {
  return {
    restrict: 'AEMC',
    template: '<div>Hi Angular <span ng-transclude></span></div>',
    //replace: true
    transclude: true
  };
});

// 指令复用
directiveModule.controller('directiveCtrl2', ($scope) => {

  $scope.loadData2 = () => {
    console.log("加载数据中2....");
  };
});
directiveModule.directive('loader', () => {
  return {
    restrict: 'AE',
    link: (scope, element, attrs) => {
      element.bind('mouseenter', () => {
        //scope.loadData();
        //scope.$apply('loadData()');

        //通过howtoload去实现指令的复用，注意此处要用小写，界面上是驼峰写法
        scope.$apply(attrs.howtoload);
      });
    }
  };
});

// 指令间相互调用
directiveModule.directive("superman", () => {
  return {
    // 创建独立的作用域
    scope: {},
    restrict: 'AE',
    // 指令内部的controller，给指令提供一组外部调用的方法
    controller: function($scope) {
      $scope.abilities = [];
      this.addStrength = () => {
        $scope.abilities.push("strength");
      };
      this.addSpeed = () => {
        $scope.abilities.push("speed");
      };
      this.addLight = () => {
        $scope.abilities.push("light");
      };
    },
    link: function(scope, element, attrs) {
      element.addClass('btn btn-primary');
      element.bind("mouseenter", () => {
        console.log(scope.abilities);
      });
    }
  }
});
directiveModule.directive("strength", () => {
  return {
    require: '^superman',
    link: function(scope, element, attrs, supermanCtrl) {
      supermanCtrl.addStrength();
    }
  }
});
directiveModule.directive("speed", () => {
  return {
    require: '^superman',
    link: function(scope, element, attrs, supermanCtrl) {
      supermanCtrl.addSpeed();
    }
  }
});
directiveModule.directive("light", () => {
  return {
    require: '^superman',
    link: function(scope, element, attrs, supermanCtrl) {
      supermanCtrl.addLight();
    }
  }
});

// scope绑定策略
directiveModule.controller('scopeCtrl', ($scope) => {
  $scope.ctrlFlavor = '百威';
  $scope.sayHello = function(name) {
    alert("Hello " + name);
  };
});

directiveModule.directive("drink", () => {
  return {
    restrict: 'AE',
    template: '<span>{{flavor}}</span>',
    scope: {
      flavor: '@'
    }
    // link: function(scope, element, attrs) {
    //   scope.flavor = attrs.flavor;
    // }
  };
});

directiveModule.directive("drink2", () => {
  return {
    restrict: 'AE',
    template: '<input type="text" ng-model="flavor">',
    scope: {
      flavor: '='
    }
  };
});

directiveModule.directive("greeting", () => {
  return {
    restrict: 'AE',
    scope: {
      greet: '&'
    },
    template: '<input type="text" ng-model="userName" />' +
      '<button class="btn btn-default" ng-click="greet({name:userName})">Greeting</button>'
  };
});

// 自定义指令
directiveModule.controller('customDirecCtrl',($scope)=> {
    $scope.title = '点击展开';
	  $scope.text = '这里是内部的内容。';
});
directiveModule.directive('expander', () => {
	return {
		restrict : 'EA',
		replace : true,
		transclude : true,
		scope : {
			title : '=expanderTitle'
		},
		template : '<div>'
				 + '<div class="title" ng-click="toggle()">{{title}}</div>'
				 + '<div class="body" ng-show="showMe" ng-transclude></div>'
				 + '</div>',
		link : function(scope, element, attrs) {
			scope.showMe = false;
			scope.toggle = () => {
				scope.showMe = !scope.showMe;
			}
		}
	}
});




export default directiveModule;
