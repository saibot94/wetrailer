/**
 * Created by christian on 6/8/2015.
 */
(function () {
    angular.module('movieApp.services.watchlist', ['ngResource']);
    angular.module('movieApp.services.watchlist')
        .factory('WatchlistService', WatchlistService);


    function WatchlistService($q, $resource){
        var Watchlist = $resource('/api/watchlist/:email', {email: '@email'});
        var userWatchlist = [];
        var fact = {};
        fact.loadWatchlistForUser = loadWatchlistForUser;
        fact.getWatchlist = getWatchlist;

        function loadWatchlistForUser(email){
               var def = $q.defer();
               var watchQuery = Watchlist.query({email: email});
               watchQuery.$promise.then(function (watchlist) {
                   console.log(watchlist);
                   angular.copy(userWatchlist, watchlist);
                   def.resolve(watchlist);
               });
                return def.promise;
        }

        function getWatchlist(){
            return userWatchlist;
        }


        return fact;
    }
})();