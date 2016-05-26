/**
 * Created by chris on 17.05.2015.
 */
var loginApp = angular.module('loginApp',['ngRoute', 'ngCookies']);

loginApp.config(function($routeProvider ,$locationProvider) {
    $routeProvider.when('/', {
        templateUrl: '/partials/login.html',
        controller: 'LoginCtrl'
        })
        .when('/sign-up',{
            templateUrl: '/partials/sign-up.html',
            controller: 'LoginCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });

    $locationProvider.html5Mode(true);
});

//The login service that handles $http requests to the api/users
loginApp.factory('LoginService', function ($http, $cookies) {
    var currentUser;
    var service = {};
    service.loginUser = function(email, password){
        return $http.get('/api/users/' + email + '/' + password);
    };
    service.registerUser = function (email, name, password) {
      return $http.post('/api/users/' + email + '/' + name + '/' + password );
    };

    service.setCookie = function (email, rememberMe) {
      $cookies.email = email;
      $cookies.rememberMe = rememberMe.toString();
    };

    service.getCookie = function () {
        return {email: $cookies.email, rememberMe: $cookies.rememberMe};
    };

    return service;
});
loginApp.controller('LoginCtrl', function($scope, $window, LoginService) {
        $scope.user = {
            email: '',
            name: '',
            password: '',
            rememberMe: false,
            userNotFound: false,
            userAlreadyExists: false,
            userSignedUp: false
        };


        function loginSuccess(response) {
            if($scope.user.rememberMe === true){
                LoginService.setCookie($scope.user.email, $scope.user.rememberMe);
            }
            else{
                LoginService.setCookie($scope.user.email, 'false');
            }
            $window.location.href = '/watch';
        }

        function loginError() { // error
            $scope.user.userNotFound = true;
        }

        function registerSuccess(response){
            $scope.user.userSignedUp = true;
        }

        function registerError(){
            $scope.user.userAlreadyExists = true;
        }

        $scope.submitForm = function (user) {
           LoginService.loginUser(user.email, user.password)
               .then(loginSuccess, loginError);
        };
        $scope.signUp = function(user){
            LoginService.registerUser(user.email, user.name, user.password)
                .then(registerSuccess, registerError);
        };
    });
