'use strict';

angular.module('common', [])
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
    })
    .filter('address', function () {
        return function (input) {
            return input.state + ', ' + input.city;
        };
    });