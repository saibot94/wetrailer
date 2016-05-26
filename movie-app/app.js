/// <reference path="../typings/node/node.d.ts"/>

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// Db access stuff
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/movieApp');


var index = require('./routes/index');
//var users = require('./routes/users');
var about = require('./routes/about');
var users = require('./routes/users');
var partials = require('./routes/partials');
var modals = require('./routes/modals');
var cookies = require('./routes/cookies');
var movies = require('./routes/movies');
var posts = require('./routes/posts');
var ratings = require('./routes/ratings');
var watchlist = require('./routes/watchlist');
var app = express();



// view engine setup
app.engine('html', require('ejs').renderFile);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');


app.use(function (req, res, next) {
   req.db = db;
   next();
});

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/sign-up',index);
app.use('/movieDetails', index);
app.use('/about', index);
//app.use('/users', users);
app.use('/partials', partials);
app.use('/modals', modals);
app.use('/api/users',users);
app.use('/api/cookies',cookies);
app.use('/api/movies',movies);
app.use('/api/posts', posts);
app.use('/api/ratings', ratings);
app.use('/api/watchlist', watchlist);
app.use('*', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
