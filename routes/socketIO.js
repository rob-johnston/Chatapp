

module.exports = function(io,ioJwt){

    // io.use(ioJwt.authorize({
    //     secret: 'abcdefg',
    //     handshake: true
    // }));

    //describing what to do on socket actions
    io.on('connection', function(socket){

        console.log("a user connected");
       // console.log("testing.. ", socket.decoded_token.name );



        socket.on('disconnect',function(){
            console.log("user disconnected");
        });

        socket.on('message', function(msg){
            console.log('message: ' + msg);
            io.emit('chat message', msg);
        });

    });

}