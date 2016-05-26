/**
 * Created by christian on 6/8/2015.
 */
(function () {
    angular.module('movieApp.controller.watchlist', []);
    angular.module('movieApp.controller.watchlist')
        .controller('WatchlistCtrl', WatchlistCtrl);

    function WatchlistCtrl($scope, WatchlistService, watchlist){
        var vm = this;
        console.log(watchlist);
        console.log(WatchlistService.getWatchlist());
        vm.watchlistMovies = WatchlistService.getWatchlist();
    }
})();