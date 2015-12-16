'use strict';

angular.module('myApp.treeView', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/treeView', {
            templateUrl: 'treeView/treeView.html',
            controller: 'View3Ctrl'
        });
    }])

    .controller('View3Ctrl', [function () {

    }]);