/// <reference path="../../../../typings/angularjs/angular.d.ts"/>
'use strict';

/**
*  Module
*
* Description
*/
var dashboardCtrl = angular.module('movieApp.controllers.dashboard', ['movieApp.services.movies','ngAnimate', 'movieApp.services.users', 'ui.bootstrap.modal']);

dashboardCtrl.controller('DashboardCtrl', function ($scope, $rootScope, $location, $sce, $modal, MoviesService, searchMovieFilter, moviesServiceResponse) {
	$scope.user = $rootScope.loggedInUser;
	$scope.movies = moviesServiceResponse;
	$scope.search = {
		text: ''
	};

	$scope.open = function (movie) {
		var modalInstance = $modal.open({
			animation: true,
			templateUrl: '/modals/watchModalContent.html',
			controller: 'WatchModalCtrl',
			size: 'lg',
			resolve: {
				movie: function () {
					return movie;
				}
			}
		});
	};

	$scope.filteredMovies = $scope.movies;

	$scope.$watch('search.text', function (oldVal) {
		$scope.filteredMovies = searchMovieFilter($scope.movies, oldVal);
	});

	$scope.getMovieImage = function (url) {
		return $sce.trustAsResourceUrl(url);
	};

	$scope.truncateName = function (name) {
		return name.slice(0, 135) + ' ...';
	};

	$scope.movieIndex = function (movie) {
		if (!movie) {
			return -1;
		}
		for (var i = 0; i < $scope.filteredMovies.length; i++) {
			if ($scope.filteredMovies[i]['_id'] === movie._id) {
				return i;
			}
		}
		return -1;
	};

	$scope.goToMovieDetails = function (movie) {
		MoviesService.setSelectedMovie(movie);
		$location.path('/movieDetails');
	};
});


dashboardCtrl.filter('searchMovie', function () {
	return function (items, search) {
		if (!search) {
			return items;
		}
		var searchText = search;
		if (!searchText || searchText === '') {
			return items;
		}

		return items.filter(function (element, index, array) {
			var name = element.name.toLowerCase();
			searchText = searchText.toLowerCase();


			return name.indexOf(searchText) > -1;
		});
	}
});