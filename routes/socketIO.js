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
            console.log("join room socket received");
            let info = JSON.parse(room);
            console.log(info);
            socket.join(info.room);
            socket.emit('joinedNewRoom', room);

            //on mongoose add channel to User, using User
            models.User.findOne({username : info.username})
                .then((user) =>{
                    user.addChannel(info.room);
                    return user.save()
                })
                .then((result)=>{
                    console.log(result);
                })
                .catch((err) => {
                    console.log(err);
                })

            //create new Channel in DB
            let newChannel = new models.Channel({name : info.room});
            newChannel.save()
                .catch((err) =>{
                    console.log(err);
                });


        });

        socket.on('leaveRoom',function (room) {
            socket.leave(room);
            //remove from models
        })



    });

};