'use strict';

angular.module('myApp.tablesView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/tablesView', {
    templateUrl: 'tablesView/tablesView.html',
    controller: 'tablesViewCtrl'
  });
}])

.controller('treeViewCtrl', [function() {

}]);