/**
 * Created by chris on 19.05.2015.
 */
var express = require('express');
var ObjectId = require('mongodb').ObjectID;
var router = express.Router();

router.get('/', function (req, res) {
    var movies = req.db.get('movies');
    movies.find({}, {}, function (e, docs) {
        res.json(docs);
    });
});

router.get('/:movieId', function (req, res) {
    console.log('got for movieid');
    var movies = req.db.get('movies');
    var mvId = ObjectId(req.params.movieId);
    console.log(req.params.movieId);
    movies.findOne({_id: mvId}, function (e, movie) {
        res.json(movie);
    });
});

module.exports = router;