var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('../models/User.js');
//var jwt = require('../services/jwt.js');
var jwt = require('jwt-simple');

var router = express.Router();



/* GET home page. */
router.post('/', function(req, res, next) {
    console.log('body: '+ JSON.stringify(req.body));
    
    var user = req.body;
    
    var newUser = new User.model({
        email: user.email,
        password: user.password
    });
    
    var payload = {
        iss: req.hostname,
        sub: newUser.id
    };
    
    var token = jwt.encode(payload, 'secretkey' )
    newUser.save(function (err) {
        //res.status(200).json(newUser);
        res.status(200).send({
            user: newUser.toJSON(),
            token: token
        });
    });
    
    //res.send('hi');
});

module.exports = router;