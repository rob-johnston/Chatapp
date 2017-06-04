import React, { Component } from 'react';
import io from 'socket.io-client'
import {SocketProvider, socketConnect,} from 'socket.io-react';




class Chat extends React.Component {


    constructor(){
        super();

        this.socket = io.connect('http://localhost:3000/socket.io/socket.io.js');
        this.socket.on('message', this.message);
        this.socket.emit('message','hello world');

    }

    message = (msg) => {
        this.socket.emit('message','hello world');
        console.log(msg)
    }


    render() {
        return (

                <div>
                    <p>Chat component</p>
                </div>

        );
    }
}

export default Chat;
