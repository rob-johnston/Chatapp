/* File containing API routes for our node server */

let express = require('express');
let router = express.Router();
//let models = require('../models');


router.get('/testEndpoint',function(req,res){
   res.send('This is a test endpoint');
});



module.exports = router;