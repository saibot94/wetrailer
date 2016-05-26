/**
 * Created by chris on 07.06.2015.
 */
(function () {
    angular.module('movieApp.controllers.about', ['ngAnimate']);

    angular.module('movieApp.controllers.about')
        .controller('AboutCtrl', function ($scope, $animate) {
           var vm = this;

            vm.item = {
                checked: false,
                description : 'WeTrailer.it is a web application which allows users to view the latest movie trailers, rate then and add them to their watchlist'
            };


        });
})();