/// <reference path="../../../../typings/angularjs/angular.d.ts"/>
/**
 * Created by chris on 19.05.2015.
 */

var sidebarCtrl = angular.module('movieApp.controllers.sidebar', ['ngCookies', 'ngAnimate']);


sidebarCtrl.factory('Logout', function($cookies, $cookieStore, $window, $http){
   var fac = {};
    function switchView() {
        $window.location.href = '/';
    };

    fac.deleteCookieAndReset = function(){
       return $http.delete('/api/cookies/email').then(function(){
         $http.delete('/api/cookies/rememberMe').then(switchView);
       });
    };

    return fac;
});

sidebarCtrl.controller('SidebarCtrl',function($scope, $rootScope, Logout){
    $rootScope.sidebar = {
        toggled: false
    };
    $scope.user = $rootScope.loggedInUser;
    $scope.logout = Logout.deleteCookieAndReset;

});
