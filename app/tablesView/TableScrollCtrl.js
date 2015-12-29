'use strict';

angular.module('myControllersTableScroll', [])
    .controller('TableScrollCtrl',
    ['$scope', '$http', '$timeout', '$q', 'dataService', function ($scope, $http, $timeout, $q, dataService) {


        $scope.gridOptions = {
            infiniteScrollRowsFromEnd: 40,
            infiniteScrollUp: true,
            infiniteScrollDown: true,
            columnDefs: [
                {name: 'id', width: '10%'},
                {name: 'name', width: '25%'},
                {name: 'gender', width: '20%'},
                {name: 'age', width: '10%'},
                {name: 'address', type: 'object', cellFilter: 'address', width: '35%'}
            ],
            data: 'data',
            onRegisterApi: function (gridApi) {
                gridApi.infiniteScroll.on.needLoadMoreData($scope, $scope.getDataDown);
                gridApi.infiniteScroll.on.needLoadMoreDataTop($scope, $scope.getDataUp);
                $scope.gridApi = gridApi;
            }
        };

        $scope.data = [];

        $scope.firstPage = 0;
        $scope.lastPage = 0;

        $scope.getFirstData = function () {
            var promise = $q.defer();
            dataService.all10000(function (data) {
                    var newData = $scope.getPage(data, $scope.lastPage);
                    $scope.data = $scope.data.concat(newData);
                    promise.resolve();
                });
            return promise.promise;
        };

        $scope.getDataDown = function () {
            var promise = $q.defer();
            dataService.all10000(function (data) {
                    $scope.lastPage++;
                    var newData = $scope.getPage(data, $scope.lastPage);
                    $scope.gridApi.infiniteScroll.saveScrollPercentage();
                    $scope.data = $scope.data.concat(newData);
                    $scope.gridApi.infiniteScroll.dataLoaded($scope.firstPage > 0, $scope.lastPage < 9).
                    then(function () {
                        $scope.checkDataLength('up');
                    }).then(function () {
                        promise.resolve();
                    });
                })
                .error(function (error) {
                    $scope.gridApi.infiniteScroll.dataLoaded();
                    promise.reject();
                });
            return promise.promise;
        };

        $scope.getDataUp = function () {
            var promise = $q.defer();
            dataService.all10000(function (data) {
                    $scope.firstPage--;
                    var newData = $scope.getPage(data, $scope.firstPage);
                    $scope.gridApi.infiniteScroll.saveScrollPercentage();
                    $scope.data = newData.concat($scope.data);
                    $scope.gridApi.infiniteScroll.dataLoaded($scope.firstPage > 0, $scope.lastPage < 9).then(function () {
                        $scope.checkDataLength('down');
                    }).then(function () {
                        promise.resolve();
                    });
                })
                .error(function (error) {
                    $scope.gridApi.infiniteScroll.dataLoaded();
                    promise.reject();
                });
            return promise.promise;
        };

        $scope.getPage = function (data, page) {
            var res = [];
            for (var i = (page * 100); i < (page + 1) * 100 && i < data.length; ++i) {
                res.push(data[i]);
            }
            return res;
        };

        $scope.checkDataLength = function (discardDirection) {
            // work out whether we need to discard a page, if so discard from the direction passed in
            if ($scope.lastPage - $scope.firstPage > 8) {
                // we want to remove a page
                $scope.gridApi.infiniteScroll.saveScrollPercentage();

                if (discardDirection === 'up') {
                    $scope.data = $scope.data.slice(100);
                    $scope.firstPage++;
                    $timeout(function () {
                        // wait for grid to ingest data changes
                        $scope.gridApi.infiniteScroll.dataRemovedTop($scope.firstPage > 0, $scope.lastPage < 4);
                    });
                } else {
                    $scope.data = $scope.data.slice(0, 900);
                    $scope.lastPage--;
                    $timeout(function () {
                        $scope.gridApi.infiniteScroll.dataRemovedBottom($scope.firstPage > 0, $scope.lastPage < 4);
                    });
                }
            }
        };

        $scope.reset = function () {
            $scope.firstPage = 0;
            $scope.lastPage = 0;

            $scope.gridApi.infiniteScroll.setScrollDirections(false, false);
            $scope.data = [];

            $scope.getFirstData().then(function () {
                $timeout(function () {
                    $scope.gridApi.infiniteScroll.resetScroll($scope.firstPage > 0, $scope.lastPage < 4);
                });
            });
        };

        $scope.getFirstData().then(function () {
            $timeout(function () {
                $scope.gridApi.infiniteScroll.resetScroll($scope.firstPage > 0, $scope.lastPage < 4);
            });
        });

    }])
;
