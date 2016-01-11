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
                    {
                        name: 'id', width: '5%', enableFiltering: false, filter: {
                        noTerm: true,
                        condition: function (searchTerm, cellValue) {
                            if ($scope.filteredId) {

                                return cellValue == $scope.filteredId;
                            }
                            return true;
                        }
                    }
                    },
                    {
                        name: 'name', width: '20%', enableFiltering: false, filter: {
                        noTerm: true,
                        condition: function (searchTerm, cellValue) {
                            if ($scope.filteredName) {
                                return cellValue.toLowerCase().indexOf($scope.filteredName.toLowerCase()) + 1;
                            }
                            return true;
                        }
                    }
                    },
                    // pre-populated search field
                    {
                        name: 'gender', width: '10%', enableFiltering: false, cellFilter: 'mapGender', filter: {
                        noTerm: true,
                        condition: function (searchTerm, cellValue) {
                            if ($scope.filteredGender) {
                                return cellValue == $scope.filteredGender;
                            }
                            return true;
                        }
                    }
                    },


                    // multiple filters
                    {
                        name: 'age', width: '10%', enableFiltering: false, filters: [
                        {
                            noTerm: true,
                            condition: function (searchTerm, cellValue) {
                                if ($scope.greaterThanAge) {
                                    return $scope.greaterThanAge < cellValue;
                                }
                                return true;
                            }
                        },
                        {
                            noTerm: true,
                            condition: function (searchTerm, cellValue) {
                                if ($scope.lessThanAge) {
                                    return $scope.lessThanAge > cellValue;
                                }
                                return true;
                            }
                        }
                    ]
                    },
                    // date filter
                    {
                        name: 'address', type: 'object',
                        filterCellFiltered: true, cellFilter: 'address', width: '25%', enableFiltering: false, filter: {
                        noTerm: true,
                        condition: function (searchTerm, cellValue) {
                            if ($scope.filteredAddress) {

                                return cellValue.toLowerCase().indexOf($scope.filteredAddress.toLowerCase()) + 1;
                            }
                            return true;
                        }
                    }
                    },
                    {
                        name: 'birthDate', width: '15%', enableFiltering: false, filter: {
                        noTerm: true,
                        condition: function (searchTerm, cellValue) {
                            if ($scope.birthDate) {
                                return cellValue.slice(0, 4) == $scope.birthDate;
                            }
                            return true;
                        }
                    }
                    },
                    {
                        name: 'createTime', width: '15%', enableFiltering: false, filters: [
                        {
                            noTerm: true,
                            condition: function (searchTerm, cellValue) {
                                if ($scope.greaterThanTime) {
                                  // var greterTime = newDate($scope.greaterThanTime.slice(0, 4),
                                  //      $scope.greaterThanTime.slice(5, 7) - 1,$scope.greaterThanTime.slice(8, 10))

                                    return Date.parse($scope.greaterThanTime) < Date.parse(cellValue);
                                }
                                return true;
                            }
                        },
                        {
                            noTerm: true,
                            condition: function (searchTerm, cellValue) {
                                if ($scope.lessThanTime) {
                                    return Date.parse($scope.lessThanTime) > Date.parse(cellValue);
                                }
                                return true;
                            }
                        }
                    ]
                    }
                ]
            };

            $scope.gridOptions.data = [];


            dataService.all(function (data) {
                $scope.gridOptions.data = data;
                data.forEach(function changeGender(row) {
                    row.gender = row.gender === 'male' ? '1' : '2';
                });
            });

            $scope.searchButton = function () {

                var searchStr = $scope.search;
                dataService.search(searchStr, function (data) {
                    $scope.gridOptions.data = data;
                    data.forEach(function changeGender(row) {
                        row.gender = row.gender === 'male' ? '1' : '2';
                    });
                    $scope.gridApi.core.refresh();
                })
            };

            $scope.filterButton = function () {
                $scope.gridApi.core.refresh();
            };


            $scope.toggleFiltering = function () {
                $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
                $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
            };

        }])

;




