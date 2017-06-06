import React, { Component } from 'react';
import io from 'socket.io-client'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import ChannelList from './ChannelList.jsx';
import MessageList from './MessageList.jsx';
import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed'

const baseJSON = {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Token' : JSON.stringify( { token : window.localStorage.getItem('ChatToken') })
    }
};



class Chat extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            username: '',
            user : {},
            input: '',
            channels: [],
            users: {},
            currentChannel: 'default',
            messages : [],
            socket : {},
            test : ''
        };

        // get information for signed in user
        this.socket = io.connect('http://localhost:3000', {
            'query' : 'token=' + window.localStorage.getItem('ChatToken')
        });

        this.socket.on('leave', this.leaveRoom);
        this.socket.on('join', this.joinRoom);
        this.socket.on('sendMessage', this.sendMessage);
        this.socket.on('chatmessage', this.receiveMessage);
    }


    componentDidMount = () => {
        this.getUserInfo(this.props.location.state.user.username);
        this.joinRoom('default');
        this.getMessages('default');
        this.getChannels();
        this.textInput.focus();
    };

    receiveMessage = (msg) => {
        console.log(msg);
        let msgs = this.state.messages;
        msgs.push(JSON.parse(msg));
        this.setState({messages : msgs});
    };

    getChannels = () => fetch('/api/channels', baseJSON)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({channels : responseJson});
            })
            .catch((err) => {
                console.log(err);
            });


    onChangeInput = (event) => {
        this.setState({input : event.target.value});
    };


    getMessages = (channelName) => fetch('/api/channel/'+ channelName + '/messages', baseJSON)
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({messages : responseJson});
        })
        .catch((err) => {
            console.log(err);
        });


    joinRoom = (room) => {
        this.socket.emit('joinRoom', room);
    };


    leaveRoom = (room) => {
        this.socket.emit('leaveRoom', room);
    };

    sendMessage = () => {
        if(this.state.input.length<1){
            return;
        }
        let message = {
            text : this.state.input,
            timestamp : Date.now(),
            user : this.state.username,
            channel : this.state.currentChannel
        };

        this.socket.emit('message', JSON.stringify(message));

        let msgs = this.state.messages;
        msgs.push(message);
        this.setState({messages : msgs, input : ''});
        this.textInput.focus();

    };

    changeActiveRoom = () => {

        //change room locally,
        //pull in new messages
    };

    getUserInfo = (user) => fetch('/api/users/' + user, baseJSON)
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({user : responseJson});
            this.setState({username : responseJson.username});
        })
        .catch((err) => {
            console.log(err);
        });


    render(){
        return (
                <div className="chatApp">
                    <div className="leftPane">
                        <ChannelList
                            channels = {this.state.channels}
                            user = {this.state.username}
                            activeChannel = {this.state.currentChannel}
                        />
                    </div>
                    <div className="rightPane">
                        <MessageList
                            messages = {this.state.messages}
                        />
                        <div className="inputArea">
                            <form onSubmit={this.sendMessage}>
                                <TextField
                                    id="input"
                                    value={this.state.input}
                                    label="input"
                                    onChange={this.onChangeInput}
                                    style={{width:500}}
                                />
                                <RaisedButton
                                    type="submit"
                                    label="send"
                                 />
                            </form>
                        </div>
                    </div>
                </div>
        );
    }
}

export default Chat;
