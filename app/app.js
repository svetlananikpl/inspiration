'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
    'ngRoute',
    'myControllersFiltering',
    'myControllersTableScroll',
    'ui.grid',
    'ui.grid.infiniteScroll',
    'myDataService',
    'nvd3',
    'myControllersStackedAreaChart',
    'myControllersTree',
    'treeControl',
    'common'
    ]);

myApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
    when('/tableViewScroll', {
        templateUrl: 'tableViewScroll/tableViewScroll.html',
        controller: 'TableScrollCtrl'
    }).
    when('/tableViewFiltering', {
        templateUrl: 'tableViewFiltering/tableViewFiltering.html',
        controller: 'TableFilteringCtrl'
    }).
    when('/graphsView', {
        templateUrl: 'graphsView/graphsView.html',
        controller: 'stackedAreaChartCtrl'
    }).
    when('/treeView', {
        templateUrl: 'treeView/treeView.html',
        controller: 'treeCtrl'
    }).
    otherwise({redirectTo: '/tableViewScroll'});
}]);

