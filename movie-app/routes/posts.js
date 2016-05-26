var express = require('express');
var ObjectId = require('mongodb').ObjectID;
var router = express.Router();

router.get('/:movieId', function (req, res) {
    var posts = req.db.get('posts');
    var mvId = ObjectId(req.params.movieId);
    posts.find({ movieId: mvId }, function (e, docs) {
        res.json(docs);
    });
});


router.post('/:movieId', function (req, res) {
    var posts = req.db.get('posts');
    var movies = req.db.get('movies');
    movies.findById(req.body.movieId, function (err, loadedMovie) {
        if (err) {
            res.json(500, err);
        }
        posts.insert({
            movieId: loadedMovie._id,
            // movieId: movies.id(loadedMovie)._id,
            userEmail: req.body.userEmail,
            userName: req.body.userName,
            text: req.body.text
        }, function (err, savedPost) {
                if (err) {
                    res.json(500, err);
                }
                res.json(savedPost);
            });
    });

});


router.get('/:movieId/:userEmail', function (req, res) {
    var posts = req.db.get('posts');

    posts.find({ userEmail: req.params.userEmail, movieId: ObjectId(req.params.movieId) }, function (e, docs) {
        res.json(docs);
    });
});


router.get('/', function (req, res) {
    var posts = req.db.get('posts');
    posts.find({}, function (e, docs) {
        res.json(docs);
    });
});

router.delete('/:movieId/:userEmail', function (req, res) {
    var posts = req.db.get('posts');
    var movieId = ObjectId(req.params.movieId);
    var userEmail = req.params.userEmail;
    posts.remove({ movieId: movieId, userEmail: userEmail }, function (e, nrOfDeleted) {
        if (nrOfDeleted > 0) {
            res.json(true);
        } else {
            res.json(false);
        }
    });
});

router.post('/:movieId/:userEmail', function (req, res) {
    var posts = req.db.get('posts');
    var movies = req.db.get('movies');
    var users = req.db.get('users');
    var moviePromise = movies.findOne({ _id: ObjectId(req.params.movieId) });
    var usersPromise = users.findOne({ email: req.params.userEmail });
    moviePromise.error(function () {
        return res.status(404).end();
    });
    moviePromise.success(function (movie) {
        if (movie == null) {
            return res.status(404).end();
        }
        usersPromise.success(function (user) {
            if (user == null) {
                return res.status(404).end();
            }
            posts.find({ movieId: movie._id, userEmail: user.email }, {}, function (e, docs) {
                if (docs.length > 0) {
                    res.json();
                    console.log('not inserted');
                }
                else {
                    var post = {
                        movieId: movie._id,
                        userEmail: user.email,
                        userName: user.name,
                        text: req.body.text
                    };
                    posts.insert(post, function () {
                        res.json(post);
                        console.log('inserted');
                    });
                }
            });
        });
    });
});

module.exports = router;