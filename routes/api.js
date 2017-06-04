/* File containing API routes for our node server */

const express = require('express');
const router = express.Router();
const authentication = require('./authentication');
const models = require('../models');


router.get('/testEndpoint',function(req,res){
   res.send('This is a test endpoint');
});

router.post('/validateToken', function(req,res){
    if(authentication.checkToken((req.body.token))){
       res.send(req.body.token);
    }  else {
       res.send('error');
    }
});

router.post('/auth',function(req,res){
    //login event - check credentials

    console.log(req.body.username);
    console.log(req.body.password);

    models.User.findOne({'username' : req.body.username}, 'password')
        .then((user) => {
           if(user.checkPassword(req.body.password)){
               res.send(JSON.stringify({token : authentication.generateToken(req.body.username)}));
           } else {
               res.send (JSON.stringify({error : 'login details are incorrect'}));
           }
        })
        .catch((err) => {
            console.log("catch error - no user found");
            res.send(JSON.stringify({error : err}));
        });
});


router.post('/register',function(req,res){

    let newUser = new models.User({ username : req.body.username, password : req.body.password});
    newUser.save().then((e) => {
        console.log(e);
        res.send(JSON.stringify({token : authentication.generateToken(req.body.username)}));
    }).catch((err)=>{
        console.log(err);
        res.send(JSON.stringify({error : err}));
    });

});


//middleware, checks token
router.use(function(req,res){

});

module.exports = router;