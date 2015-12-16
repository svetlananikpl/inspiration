'use strict';

angular.module('myApp.graphsView', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/graphsView', {
            templateUrl: 'graphsView/graphsView.html',
            controller: 'View2Ctrl'
        });
    }])

    .controller('View2Ctrl', [function () {

    }]);