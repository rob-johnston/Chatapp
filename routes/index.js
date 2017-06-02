let express = require('express');
let api = require('./api');
let path = require('path');
let router = express.Router();


//add our api endpoints
router.use('/api', api);


module.exports = router;