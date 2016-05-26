/**
 * Created by chris on 5/24/2015.
 */
angular.module('movieApp.controllers.watchmodal', ['movieApp.controllers.dashboard', 'ngAnimate'])
    .controller('WatchModalCtrl', function ($scope, $sce, $modal, $modalInstance, movie) {
    $scope.movie = movie;
    $scope.ok = function () {
        $modalInstance.close('ok');
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.watchMovie = function () {
        return $sce.trustAsResourceUrl(movie.trailerUrl);
    }
});