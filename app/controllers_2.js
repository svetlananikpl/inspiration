'use strict';

angular.module('myControllers2', [])
    .controller('MainTableFilteringCtrl',
        ['$scope', '$http', 'uiGridConstants', function ($scope, $http, uiGridConstants) {

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
                    {field: 'id', headerCellClass: $scope.highlightFilteredHeader},
                    {field: 'name', headerCellClass: $scope.highlightFilteredHeader},
                    // pre-populated search field
                    {
                        field: 'gender', filter: {
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
                        field: 'age',
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
                    {field: 'address', headerCellClass: $scope.highlightFilteredHeader}
                ]
            };

            $http.get('data/100_complex.json')
                .success(function (data) {
                    console.log(data);
                    $scope.gridOptions.data = data;
                    $scope.data = data;

                    data.forEach(function changeGender(row) {
                        row.gender = row.gender === 'male' ? '1' : '2';
                    })
                });

            $scope.toggleFiltering = function () {
                $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
                $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
            };
        }])
    .filter('mapGender', function () {
        var genderHash = {
            1: 'male',
            2: 'female'
        };

        return function (input) {
            if (!input) {
                return '';
            } else {
                return genderHash[input];
            }
        };
    });




