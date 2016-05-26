/**
 * Created by chris on 5/24/2015.
 */
(function () {
    var movieDetailsCtrl = angular.module('movieApp.controllers.moviedetails', ['ngAnimate']);
    movieDetailsCtrl.controller('MovieDetailsCtrl', function ($scope, $rootScope, $sce, RatingsService, PostsService, selectedMovie) {
        $scope.user = $rootScope.loggedInUser;
        $scope.movie = selectedMovie;
        $scope.posts = {};
        $scope.review = {
            text: ''
        };

        $scope.getReviewValue = getReviewValue;
        $scope.movieRating = {
            value: '',
            averageValue: ''
        };
        $scope.ratings = RatingsService.getActualRatings();
        setRatings($scope.user, $scope.ratings, $scope.movie);



        $scope.posts = PostsService.getPostsForMovie($scope.movie._id);
        $scope.getMovieImage = function () {
            return $sce.trustAsResourceUrl($scope.movie.image);
        };


        $scope.submitNewPost = function () {
            var post = {
                movieId: $scope.movie._id,
                userEmail: $scope.user.email,
                userName: $scope.user.name,
                text: $scope.review.text

            };
            PostsService.createPostForMovie(post);
            $scope.review.text = '';
            $scope.posts = PostsService.getPostsForMovie($scope.movie._id);
        };

        //Watch for changes of the value and then push them to the database
        $scope.$watch('movieRating.value', function (newVal, oldVal) {
            if (oldVal != newVal) {
                RatingsService.updateRating(newVal, $scope.user, $scope.movie)
                    .then(function () {
                        $scope.ratings = RatingsService.getActualRatings();
                        setRatings($scope.user, $scope.ratings, $scope.movie);
                    })
            }
        });

        //Checks to see if the user has already posted for this movie
        $scope.userHasNotPosted = function () {
            for (var i = 0; i < $scope.posts.length; i++) {
                if ($scope.posts[i].userEmail == $scope.user.email) {
                    return false;
                }
            }
            return true;
        };


        function setRatings(user, ratings) {
            var tmpRating = getRatingsForUser(user.email, ratings);

            if(tmpRating){
                $scope.movieRating.value = tmpRating.rating;
            }
            if(ratings){
                var val = RatingsService.convertRatingsToFloat(ratings);
                $scope.movieRating.averageValue = RatingsService.convertFloatToRatings(val);
            }
        }

        function getReviewValue(review) {
            var rating = getRatingsForUser(review.userEmail, $scope.ratings);
            return rating.rating;
        }

        function getRatingsForUser(userEmail, ratings) {
            for (var i = 0; i < ratings.length; i++) {
                if(ratings[i].userEmail == userEmail){
                    return ratings[i];
                }
            }
            return false;
        }
    });


})();
