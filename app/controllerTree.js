/**
 * Created by Admin on 14.12.2015.
 */
angular.module('myControllersTree', []).
controller('treeCtrl', ['$scope', 'searchService', function ($scope, searchService) {
    $scope.byRange = function (fieldName, minValue, maxValue) {
        if (minValue === undefined) minValue = Number.MIN_VALUE;
        if (maxValue === undefined) maxValue = Number.MAX_VALUE;

        return function predicateFunc(item) {
            return minValue <= item[fieldName] && item[fieldName] <= maxValue;
        };
    };

}]);

