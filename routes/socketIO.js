const models  = require('../models');

module.exports = function(io,ioJwt){

    //socket authentication
    io.use(ioJwt.authorize({
        secret: 'abcdefg',
        handshake: true
    }));

    //describing what to do on socket actions
    io.on('connection', function(socket){

        console.log("a user connected");
        socket.on('disconnect',function(){
            console.log("user disconnected");
        });

        socket.on('message', function(msg){
            let parsedMsg = JSON.parse(msg);
            let messageToSave = new models.Message(parsedMsg);
            messageToSave.save().then((e) => {
                    console.log(e)
            })
            .catch((err) =>{
                console.log(err);
            });
            socket.broadcast.to(parsedMsg.channel).emit('chatmessage', msg);
        });


        socket.on('joinRoom',function(room){
            socket.join(room);
        });

        socket.on('leaveRoom',function (room) {
            socket.leave(room);
        })



    });

};