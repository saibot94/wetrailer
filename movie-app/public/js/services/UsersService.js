(function () {
    'use strict';
    var usersService = angular.module('movieApp.services.users', ['ngCookies']);

    usersService.factory('UsersService', function ($http, $cookies, $resource) {
        var User = $resource('/api/users/:email',
            {
                email: '@email'
            });

        return {

            getCurrentUser: function () {
                return User.get({ email: $cookies.email }, function (response) {
                    return response;
                });
            }
        };
    });
})();