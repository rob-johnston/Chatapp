/* File containing API routes for our node server */

let express = require('express');
let router = express.Router();
//let models = require('../models');


router.get('/testEndpoint',function(req,res){
   res.send('This is a test endpoint');
});


router.post('/auth',function(req,res){
   console.log(req.body.username);
   console.log(req.body.password);
   res.send(JSON.stringify({result : 'great success'}));
})


module.exports = router;