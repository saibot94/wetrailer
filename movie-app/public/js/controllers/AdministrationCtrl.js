(function () {
    var administrationCtrl = angular.module('movieApp.controllers.administration', ['ngAnimate']);

    administrationCtrl.controller('AdministrationCtrl', function ($scope, $rootScope) {
        $scope.user = $rootScope.loggedInUser;

        $scope.upload = function () {
            console.log('uploading...')
        }
    });
})();