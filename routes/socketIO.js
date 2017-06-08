const models  = require('../models');

module.exports = function(io,ioJwt){

    //socket authentication
    io.use(ioJwt.authorize({
        secret: 'abcdefg',
        handshake: true
    }));

    //describing what to do on socket actions
    io.on('connection', function(socket){

        socket.on('disconnect',function(){
            console.log("user disconnected");
        });

        socket.on('message', function(msg){

            Object.keys(io.sockets.connected).forEach(function(socket) {
                console.log(io.sockets.connected[socket].decoded_token.username); // socketId
            });

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
            let info = JSON.parse(room);
            socket.join(info.room);
            socket.emit('joinedNewRoom', room);

            //on mongoose add channel to User, using User
            models.User.findOne({username : info.username})
                .then((user) =>{
                    user.addChannel(info.room);
                    return user.save()
                })
                .catch((err) => {
                    console.log(err);
                });

            //create new Channel in DB - catch error if already exists
            let newChannel = new models.Channel({name : info.room});
            newChannel.save()
                .catch((err) =>{
                    console.log('Channel Exists');
                });


        });

        socket.on('leaveRoom',function (room) {
            socket.leave(room);
            //remove from models
        });

        socket.on('deleteMessage', function(messageID){

            models.Message.findOne({_id : messageID})
                .then((msg) => {
                    if (msg.user === socket.decoded_token.username){
                        return;
                    }
                });


            console.log('delete message socket call');
            models.Message.findOneAndRemove({_id : messageID})
                .then((removed) =>{
                    console.log(removed);
                    io.in(removed.channel).emit('updateMessages', removed.channel);
                })
                .catch((err) => {
                    console.log(err);
                });
        });

        socket.on('editMessage', function(messageID){
            models.Message.findOne({_id : messageID, username : socket.decoded_token.username})
                .then((msg) => {
                    //edit message

                    //save message
                })
                .catch((err) => {
                    console.log(err);
                })
        });




    });

};