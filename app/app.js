'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
    'ngRoute',
    'myApp.tablesView',
    'myApp.graphsView',
    'myApp.treeView',
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
    $routeProvider.otherwise({redirectTo: '/tablesView'});
}]);

