/**
 * Created by chris on 05.06.2015.
 */
(function () {
    var Ratings;
    var UserRatings;
    angular.module('movieApp.services.ratings',['ngResource']);

    angular.module('movieApp.services.ratings')
        .factory('RatingsService', function ($resource, $q) {
            var movieRatings = [];

            var fact = {
                getRatingsForMovie: getRatingsForMovie,
                getRatingsForUser: getRatingsForUser,
                getActualRatings: getActualRatings,
                convertRatingsToFloat: convertRatingsToFloat,
                convertFloatToRatings: convertFloatToRatings,
                updateRating: updateRating
            };
            // can work for a user or for a movie
            Ratings = $resource('/api/ratings/:id',{
                id: '@id'
            });

            UserRatings = $resource('/api/ratings/:movieId/:userEmail/:newRating',{
                movieId:'@movieId',
                userEmail: '@userEmail',
                newRating: '@newRating'
            });

            function getRatingsForMovie(movieId, outsideDefer) {
                var defObj = $q.defer();
                var ratingsQuery = Ratings.query({id: movieId});

                ratingsQuery.$promise.then(function (ratings) {
                    angular.copy(ratings, movieRatings);
                    if(outsideDefer){
                        outsideDefer.resolve();
                    }
                    defObj.resolve(ratings);
                });
                return defObj.promise;
            }
            function getRatingsForUser(userEmail){
                var defObj = $q.defer();
                var ratingsQuery = Ratings.query({id: userEmail});
                ratingsQuery.$promise.then(function (ratings) {
                    defObj.resolve(ratings);
                });

                return defObj.promise;
            }

            function getActualRatings() {
                return movieRatings;
            }

            function convertRatingsToFloat(ratings){
                var sum = 0;
                for(var i = 0 ; i < ratings.length; i++){
                    var val = ratingToFloatValue(ratings[i]);
                    sum += val;
                }
                return (sum / ratings.length);
            }

            function ratingToFloatValue(rating){
                switch(rating.rating){
                    case "half":
                        return 0.5;
                        break;
                    case "1":
                        return 1.0;
                        break;
                    case "1 and a half":
                        return 1.5;
                        break;
                    case "2":
                        return 2.0;
                        break;
                    case "2 and a half":
                        return 2.5;
                        break;
                    case "3":
                        return 3.0;
                        break;
                    case "3 and a half":
                        return 3.5;
                        break;
                    case "4":
                        return 4.0;
                        break;
                    case "4 and a half":
                        return 4.5;
                        break;
                    case "5":
                        return 5.0;
                        break;
                }
            }

            function convertFloatToRatings(value){
                    if(value < 0.5)
                        return "0";

                    if(value < 1)
                        return 'half';
                    if(value < 1.5)
                        return '1';
                    if(value < 2.0)
                        return '1 and a half';
                    if(value < 2.5)
                        return '2';
                    if(value < 3.0)
                        return '2 and a half';
                    if(value < 3.5)
                        return '3';
                    if(value < 4)
                        return '3 and a half';
                    if(value < 4.5)
                        return '4';
                    if(value < 5)
                        return '4 and a half';
                    if(value < 5.5)
                        return '5';
                }

            function updateRating(rating, user, movie){
                var defer = $q.defer();
                var updatedRating = new UserRatings({movieId: movie._id, userEmail: user.email, newRating: rating});
                updatedRating.$save(function () {
                    return getRatingsForMovie(movie._id, defer);
                });
                return defer.promise;
            }

            return fact;
        });
})();