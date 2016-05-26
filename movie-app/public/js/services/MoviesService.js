(function () {
    'use strict';    
    var moviesService = angular.module('movieApp.services.movies',['ngResource']);
    
    moviesService.factory('MoviesService', function ($http, $resource) {
        var selectedMovie = {};
        var Movie = $resource('/api/movies/:id', {
            
        });
        
        return {
            getLatestMovies: function(){
                return Movie.query(function (movies){
                    return movies;
                });
            },
            getMovieByUrl: function(image){
                return $http.get(image);
            },
            getSelectedMovie: function(){
                return selectedMovie;
            },
            setSelectedMovie: function (param) {
                selectedMovie = param;
            }
        };
    });
})();