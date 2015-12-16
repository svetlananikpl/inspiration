'use strict';

angular.module('myApp.tablesView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/tablesView', {
    templateUrl: 'tablesView/tablesView.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', [function() {

}]);