/**
 * Created by christian on 6/8/2015.
 */
var express = require('express');
var ObjectId = require('mongodb').ObjectID;
var router = express.Router();

router.get('/:email', function (req, res) {
    var users = req.db.get('users');
    var watchlist = req.db.get('watchlist');
    var movies = req.db.get('movies');
    users.findOne({email: req.params.email}, function (e, data) {
        if(data != null){
            watchlist.findOne({email: req.params.email}, function (e, data) {
                if(data != null){
                    var ids = data.list;
                    console.log(ids);
                   movies.find({_id: {$in : ids}},{}, function (e, docs) {
                       if(!e){
                           console.log(docs);
                           res.json(docs);
                           return;
                       }else{
                           res.status(500).end();
                       }
                   });
                }
                else{
                    console.log('not found, inserting empty watchlist object');
                    watchlist.insert({email: req.params.email, list: []}, function (e, data) {
                        res.json(data.list);
                    });
                }
            });
        }else{
            res.status(404).end('User not found!');
        }
    })
});


router.post('/:email/:movieId', function (req, res) {
    var users = req.db.get('users');
    var watchlist = req.db.get('watchlist');
    var mvId = ObjectId(req.params.movieId);
    users.findOne({email: req.params.email}, function (e, data) {
        if (data != null) {
            watchlist.findOne({email: req.params.email}, function (e, data) {
                console.log(data.list);
                if(contains(data.list, mvId)){
                    res.json({message: 'already exists!'});
                }
                else{
                    watchlist.update({email: req.params.email}, {$push: {list: mvId}}, function (e, data) {
                        res.json({message: 'ok'});
                    })
                }
            });
        }
    });
});

router.get('/:email/:movieId', function (req, res) {
    var users = req.db.get('users');
    var watchlist = req.db.get('watchlist');
    var mvId = ObjectId(req.params.movieId);
    users.findOne({email: req.params.email}, function (e, data) {
        if (data != null) {
            watchlist.findOne({email: req.params.email}, function (e, data) {
                if(contains(data.list, mvId)){
                    res.json({message: 'ok'});
                }else{
                    res.json({message: 'no'});
                }
            });
        }
        else {
            res.status(404).end('not found!');
        }
    });
});

function contains(list, val){
    for(var i = 0; i < list.length; i++){
        if(val.equals(list[i])){
            return true;
        }
    }
    return false;
}

module.exports = router;