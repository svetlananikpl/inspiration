/**
 * Created by Admin on 10.12.2015.
 */
angular.module('mySearchService', [])
    .factory('searchService', ['$http', function searchServiceFactory($http) {
        return {
            all: function (callback) {
                $http.get('data/100_complex.json')
                    .success(function (data) {
                        return callback(data);
                    })
            },
            search: function (search, callback) {

                $http.get('data/100_complex.json')
                    .success(function (data) {

                        if (!search) {
                            return callback(data);
                        }

                        var result = [];

                        search = search.toLowerCase();

                        data.forEach(function (item) {
                            Object.keys(item).forEach(function (key) {

                                if (String(item[key]).toLowerCase().indexOf(search) !== -1) {
                                    result.push(item);
                                    console.log(result);
                                }

                            })
                        });

                        return callback(result);
                    });

            }

        }
    }
    ])
;