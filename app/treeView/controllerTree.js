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

    $scope.treeOptions = {
        nodeChildren: "children",
        dirSelectable: true,
        injectClasses: {
            ul: "a1",
            li: "a2",
            liSelected: "a7",
            iExpanded: "a3",
            iCollapsed: "a4",
            iLeaf: "a5",
            label: "a6",
            labelSelected: "a8"
        }
    };

    searchService.tree(function (data) {
        $scope.dataForTheTree = data;
    });


    $scope.showSelected = function (node, selected) {
        $scope.selected = selected;
        if (selected) {
                        $scope.selection = node;
        } else $scope.selection = [];
        console.log(node);
    };


}]);

