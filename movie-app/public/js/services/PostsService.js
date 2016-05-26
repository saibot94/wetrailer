/// <reference path="../../../../typings/angularjs/angular.d.ts"/>
(function () {

	var postsService = angular.module('movieApp.services.posts', ['ngResource']);
	var Posts;

	postsService.factory('PostsService', function ($resource) {
		Posts = $resource('/api/posts/:movieId', {
			movieId: '@movieId'
		});
		return {
			getPostsForMovie: getPostsForMovie,
			createPostForMovie: createPostForMovie
		};
	});

	function getPostsForMovie(id) {
		return Posts.query({
			movieId: id
		}, function (posts) {
				return posts;
			});
	}

	function createPostForMovie(postDetails) {
		var newPost = new Posts(postDetails);
		newPost.$save(); //for errorhandling
	}

})();
