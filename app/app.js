'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
    'ngRoute',
    'myApp.tablesView',
    'myApp.graphsView',
    'myApp.treeView',
    'myApp.version',
    'myControllersFiltering',
    'myControllersTableScroll',
    'ui.grid',
    'ui.grid.infiniteScroll',
    'mySearchService',
    'nvd3',
    'myControllersStackedAreaChart',
    'myControllersTree',
    'treeControl'
    ]);

myApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/tablesView'});
}]);

