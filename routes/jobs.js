var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//var jwt = require('../services/jwt.js');
var jwt = require('jwt-simple');

var router = express.Router();

var jobs = [ 'Cook', 'Superhero', 'Unicorn Wisperer', 'Toast Inspector'];

/* GET home page. */
router.get('/', function(req, res, next) {
    //check for authorization header
    if(!req.headers.authorization) {
        console.log('401... not authorized');
        return res.status(401).send({message: 'not authorized'});
    }
    
    var token = req.headers.authorization.split(' ')[1];
    var payload = jwt.decode(token, 'secretkey');
    if(!payload.sub) {
        console.log('no sub in payload');
        res.status(401).send({
            message: 'Authentication failed'
        });
    }
    
    
    res.json(jobs);
    // res.send('hi');
});

module.exports = router;