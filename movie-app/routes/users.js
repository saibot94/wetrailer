/**
 * Created by chris on 18.05.2015.
 */
var express = require('express');
var router = express.Router();

//Get all users
router.get('/', function (req, res) {
    var usersCollection = req.db.get('users');
    usersCollection.find({}, {}, function (e, docs) {
        res.json(docs);
    });
});

router.get('/:email', function (req, res) {
    var usersCollection = req.db.get('users');
    var paramEmail =  req.params.email;
    usersCollection.findOne({'email' : paramEmail}, function (err, item) {
        if (!err) {
            if(item){
                res.json(item)
            }else{
                res.status(404).json();
            }
        } else {
            res.status(500).send('Internal server error!');
        }
    })
});

router.get('/:email/:password', function (req, res) {
    var usersCollection = req.db.get('users');
    var paramEmail =  req.params.email;
    var paramPass = req.params.password;
    usersCollection.findOne({'email' : paramEmail, 'password' : paramPass}, function (err, item) {
        if (!err) {
            if(item){
                res.json(item)
            }else{
                res.status(404).json();
            }
        } else {
            res.status(500).send('Internal server error!');
        }
    })
});

//Register
router.post('/:email/:name/:password', function (req, res) {
    var usersCollection = req.db.get('users');
    var paramEmail =  req.params.email;
    var paramPass = req.params.password;
    var paramName = req.params.name;
    var getUserPromise = usersCollection.findOne({'email' : paramEmail});
    getUserPromise.success(function (data) {
        if(data !== null){
            res.status(404).json();
        }else{
            var pm =  usersCollection.insert({'email' : paramEmail, 'password': paramPass, 'name': paramName, 'isAdmin' : false});
            pm.success(function(){res.json()});
            pm.error(function(){res.status(500).json()});
        }
    });
});

module.exports = router;
