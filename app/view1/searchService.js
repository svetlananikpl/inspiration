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

            },
            tree: function (callback) {
                $http.get('data/100_complex.json')
                    .success(function (data) {

                        var result = [
                            {
                                name: 'male',
                                children: [
                                    {
                                        "age": "15-35",
                                        "children": []
                                    },
                                    {
                                        "age": "36-50",
                                        "children": []
                                    },
                                    {
                                        "age": "51-65",
                                        "children": []
                                    },
                                    {
                                        "age": "over 60",
                                        "children": []
                                    }
                                ]
                            },
                            {
                                name: 'female',
                                children: [
                                    {
                                        "age": "age: 15-35",
                                        "children": []
                                    },
                                    {
                                        "age": "age: 36-50",
                                        "children": []
                                    },
                                    {
                                        "age": "age: 51-65",
                                        "children": []
                                    },
                                    {
                                        "age": "age: over 65",
                                        "children": []
                                    }
                                ]
                            }
                        ];

                        data.forEach(function (item) {
                            result[item.gender === "male" ? 0 : 1]
                                .children[(item.age < 36) ? 0 : (item.age < 51) ? 1 : (item.age < 66) ? 2 : 3]
                                .children.push(item);
                        });

                        return callback(result);
                    });
            }

        }
    }
    ])
;