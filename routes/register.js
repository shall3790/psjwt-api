var express = require('express');
var bodyParser = require('body-parser');

var router = express.Router();


/* GET home page. */
router.post('/', function(req, res, next) {
    console.log(req.body);
    res.send('hi');
});

module.exports = router;