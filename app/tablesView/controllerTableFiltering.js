'use strict';

angular.module('myControllersFiltering', [])
    .controller('TableFilteringCtrl',
        ['$scope', 'uiGridConstants', 'dataService', function ($scope, uiGridConstants, dataService) {

    $scope.highlightFilteredHeader = function (row, rowRenderIndex, col, colRenderIndex) {
        if (col.filters[0].term) {
            return 'header-filtered';
        } else {
            return '';
        }
    };

    $scope.gridOptions = {
        enableFiltering: true,
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
        },
        columnDefs: [
            // default
            {field: 'id', width: '10%', headerCellClass: $scope.highlightFilteredHeader},
            {field: 'name', width: '25%', headerCellClass: $scope.highlightFilteredHeader},
            // pre-populated search field
            {
                field: 'gender', width: '20%', filter: {
                term: '1',
                type: uiGridConstants.filter.SELECT,
                selectOptions: [
                    {value: '1', label: 'male'},
                    {value: '2', label: 'female'}]
            },
                cellFilter: 'mapGender', headerCellClass: $scope.highlightFilteredHeader
            },


            // multiple filters
            {
                field: 'age', width: '10%',
                filters: [
                    {
                        condition: uiGridConstants.filter.GREATER_THAN,
                        placeholder: 'greater than'
                    },
                    {
                        condition: uiGridConstants.filter.LESS_THAN,
                        placeholder: 'less than'
                    }
                ], headerCellClass: $scope.highlightFilteredHeader
            },
            // date filter
            {field: 'address', type: 'object', cellFilter: 'address', width: '35%', headerCellClass: $scope.highlightFilteredHeader}
        ]
    };

    $scope.gridOptions.data = [];



    dataService.all(function (data) {
        $scope.gridOptions.data = data;
        data.forEach(function changeGender(row) {
            row.gender = row.gender === 'male' ? '1' : '2';
        });
    });

    $scope.searchButton = function(){

        var searchStr = $scope.search;
        dataService.search(searchStr, function (data) {
            $scope.gridOptions.data = data;
            data.forEach(function changeGender(row) {
                row.gender = row.gender === 'male' ? '1' : '2';
            });
            $scope.gridApi.core.refresh();
        })
    };


    $scope.toggleFiltering = function () {
        $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
        $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
    };

}])

;




