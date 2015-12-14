/**
 * Created by Admin on 11.12.2015.
 */
angular.module('myControllersStackedAreaChart', []).
controller('stackedAreaChartCtrl', ['$scope', 'searchService', function ($scope, searchService) {

    $scope.options = {
        chart: {
            type: 'stackedAreaChart',
            height: 450,
            margin: {
                top: 20,
                right: 20,
                bottom: 30,
                left: 40
            },
            x: function (d) {
                return d[0];
            },
            y: function (d) {
                return d[1];
            },
            useVoronoi: false,
            clipEdge: true,
            duration: 100,
            useInteractiveGuideline: true,
            xAxis: {
                //tickFormat: function (d) {
                //    return d3.format(',.2f')(d)
                //}
                "showMaxMin": false
            },
            yAxis: {
                //tickFormat: function (d) {
                //    return

                enabled: true,
                scaleExtent: [1, 10],
                useFixedDomain: false,
                useNiceScale: false,
                horizontalOff: false,
                verticalOff: true,
                unzoomEventType: 'dblclick.zoom'
            }
        }
    };

    var graphData = [
        {
            key: 'male',
            values: []
        },
        {
            key: 'femail',
            values: []
        }
    ];

    for (var i = 0; i < 100; i++) {
        graphData[0].values[i] = [i, 0];
        graphData[1].values[i] = [i, 0];
    }

    searchService.all(function (data) {
        data.forEach(function getData(item)
        {
            graphData[item.gender === "male" ? 0 : 1].values[item.age][1]++;
        })
    });

    $scope.data = graphData;
}]);