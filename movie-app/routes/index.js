var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
/* GET home page. */
function checkForUser(request, response){
    var db = request.db;
    var usersCollection = request.db.get('users');
    var getUserPromise = usersCollection.findOne({'email' : request.cookies.email});
    getUserPromise.success(function (data) {
       if(data !== null){
           response.redirect('/watch');
       }else{
           response.clearCookie('email');
           response.clearCookie('rememberMe');
           response.redirect('/');
       }
    });
}


router.get('/', function(request, response, next) {
    if(request.cookies.email && request.cookies.rememberMe === 'true'){
        checkForUser(request, response);
    }else{
        response.render('index.html');
    }
});

router.get('/watch', function (request, response, next) {
    if(request.cookies.email){
      response.render('watch.html');
    }else{
      response.render('index.html');
    }
});


module.exports = router;
