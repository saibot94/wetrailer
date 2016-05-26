/// <reference path="../../../typings/angularjs/angular.d.ts"/>

(function () {
  'use strict';

var movieApp = angular.module('movieApp', [
  'ngRoute', 'ngCookies',
  'movieApp.controllers.dashboard',
  'movieApp.controllers.sidebar',
  'movieApp.services.users',
  'movieApp.services.movies',
  'movieApp.services.posts',
  'movieApp.controllers.watchmodal',
  'movieApp.controllers.moviedetails',
  'movieApp.controllers.administration',
  'movieApp.controllers.about',
  'movieApp.services.ratings',
  'movieApp.services.admin',
  'movieApp.controller.watchlist',
  'movieApp.services.watchlist',
  'ui.bootstrap',
  'ngResource',
  'ngAnimate'
]);

movieApp.
  config(function ($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', {
		  templateUrl: '/partials/dashboard.html',
		  controller: 'DashboardCtrl',
    resolve: {
      moviesServiceResponse: function (MoviesService) {
        return MoviesService.getLatestMovies();
      }
    }
  })
  .when('/movieDetails', {
    templateUrl: '/partials/selectedMovie.html',
    controller: 'MovieDetailsCtrl',
    resolve: {
      selectedMovie: function (MoviesService) {
        return MoviesService.getSelectedMovie();
      },
      ratings: function (RatingsService, MoviesService) {

        return RatingsService.getRatingsForMovie(MoviesService.getSelectedMovie()._id);

      }
    }})
  .when('/about', {
    templateUrl: '/partials/about.html',
    controller: 'AboutCtrl',
    controllerAs: 'vm'
  })
  .when('/admin', {
    templateUrl: '/partials/admin.html',
    controller: 'AdministrationCtrl'
  })
  .when('/watchlist', {
    templateUrl: '/partials/watchlist.html',
    controller: 'WatchlistCtrl',
    controllerAs: 'vm',
    resolve: {
      watchlist: function (WatchlistService, $rootScope) {
        return WatchlistService.loadWatchlistForUser($rootScope.loggedInUser.email);
      }
    }
  })
    .otherwise({
    redirectTo: '/'
  });

  $locationProvider.html5Mode(true);
});

movieApp.run(function ($cookies, $rootScope, Logout, UsersService) {
  if (!$cookies.email) {
    Logout.deleteCookieAndReset();
  }else{
    $rootScope.loggedInUser = UsersService.getCurrentUser();
  }
});


movieApp.directive('imageLoad', function () {
  return {
    restrict: 'A',
    link: function (scope, element) {
      element.bind('load', function () {
        console.log(scope.movie.image)
      })
    }
  }
});
})(window.angular);