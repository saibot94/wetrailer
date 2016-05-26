/**
 * Created by chris on 19.05.2015.
 */
var express = require('express');
var router = express.Router();

router.delete('/:cookieName', function (req,res) {
    res.clearCookie(req.params.cookieName);
    res.end();
});

module.exports = router;