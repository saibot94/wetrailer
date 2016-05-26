var express = require('express');
var router = express.Router();

/* GET about page. */
router.get('/', function(req, res, next) {
  res.cookie('userId', '1', {maxAge: 900000});
  res.render('about');
});

module.exports = router;
