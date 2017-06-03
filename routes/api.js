/* File containing API routes for our node server */

let express = require('express');
let router = express.Router();
//let models = require('../models');

let jwt = require('jsonwebtoken');
let secret = 'abcdefg';


//going to to some auth stuff here for testing, refactor out properly later


router.get('/testEndpoint',function(req,res){
   res.send('This is a test endpoint');
});


router.post('/auth',function(req,res){
   console.log(req.body.username);
   console.log(req.body.password);
   //handle a login event
    // check our DB
    // if matching then provide a JSON web token
   res.send(JSON.stringify({token : jwt.sign({foo: req.body.username},'abcdefg')}));
})

router.post('/register',function(req,res){
   //handle a new user registration
    //check username does not exist
    //if it doesnt then add username and password to db
    //create and provide json web token
})


module.exports = router;