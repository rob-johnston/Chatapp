

module.exports = function(io,ioJwt){

    //socket authentication
    io.use(ioJwt.authorize({
        secret: 'abcdefg',
        handshake: true
    }));

    //describing what to do on socket actions
    io.on('connection', function(socket){

        console.log("a user connected");
       // console.log("testing.. ", socket.decoded_token.name );

        socket.on('disconnect',function(){
            console.log("user disconnected");
        });

        socket.on('message', function(msg){
            let parsedMsg = JSON.parse(msg);
            console.log(parsedMsg);
            socket.broadcast.to(parsedMsg.channel).emit('chatmessage', msg);
        });

        socket.on('joinRoom',function(room){
            socket.join(room);
        });



    });

};