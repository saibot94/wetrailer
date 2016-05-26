/**
 * Created by chris on 5/24/2015.
 */
var express = require('express');
var router = express.Router();

router.get('/:name', function (req, res) {
    var name = req.params.name;
    res.render('modals/' + name);
});

module.exports = router;