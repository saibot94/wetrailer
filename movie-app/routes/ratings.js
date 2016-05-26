/**
 * Created by chris on 05.06.2015.
 */
var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;



router.get('/:movieId', function (req, res, next) {
    var ratings = req.db.get('ratings');
    var mvId;
    //Tries to get a movieId, otherwise it just goes to the email request, which must work
    try{
        mvId = ObjectId(req.params.movieId);
        ratings.find({movieId: mvId}, {}, function (e, docs) {
            res.json(docs);
        });
    }
    catch(e){
        next();
    }
});


router.get('/:userEmail', function (req, res) {
    var ratings = req.db.get('ratings');
    var email = req.params.userEmail;
    ratings.find({userEmail: email}, {}, function (e, docs) {
        res.json(docs);
    });
});

router.post('/:movieId/:userEmail/:newRating', function (req, res) {
    var ratings = req.db.get('ratings');
    var email = req.params.userEmail;
    var rating = req.params.newRating;
    try{

        var mvId = ObjectId(req.params.movieId);
        function doStuff(e, val) {
            if (val == null) {
                ratings.insert({movieId: mvId, userEmail: email, rating: rating}, function () {
                    res.end('inserted new rating');
                })
            } else {
                ratings.findAndModify({movieId: mvId, userEmail: email}, {$set: {rating: rating}}, function () {
                    res.end('modified existing rating');
                });
            }
        }
        ratings.findOne({movieId: mvId, userEmail: email}, doStuff);
    }
    catch(e){
        res.status(500).end();
    }
});

router.get('/', function (req, res) {
   var ratings = req.db.get('ratings');
    ratings.find({},{}, function (e, docs) {
        res.json(docs);
    })
});

module.exports = router;