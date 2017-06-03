let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let socketioJwt = require('socketio-jwt');
let path = require('path');
let index = require(path.join(__dirname,'routes','index.js'));
let socketActions = require(path.join(__dirname,'routes','socketIO.js'));
let bodyParser = require('body-parser');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


//static resource path
app.use('/static', express.static('public'));

//send our app - basic operation
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname,'views','index2.html'));
});


//main paths
app.use('/', index);

//include out socket actions
socketActions(io,socketioJwt);



http.listen(3000, function(){
    console.log('listening on *:3000');
});

module.exports = http;