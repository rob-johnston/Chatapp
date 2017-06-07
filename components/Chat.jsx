import React, { Component } from 'react';
import io from 'socket.io-client'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import ChannelList from './ChannelList.jsx';
import MessageList from './MessageList.jsx'
import {withRouter} from 'react-router-dom';



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

    componentWillMount = () => {
        //if theres a token but no user..
        if(this.props.location.state==undefined && window.localStorage.getItem('ClubToken')){
            this.extractUsernameFromToken();
        }
    }

    extractUsernameFromToken = () => fetch('/api/decodeToken',baseJSON)
        .then((res) =>{
            this.state.username=res.username;
         })
        .catch((err) =>{
            console.log(err);
        });

    componentDidMount = () => {
        if(this.props.location.state){
            this.getUserInfo(this.props.location.state.user.username);
        } else if (this.state.username){
            this.getUserInfo(this.state.username);
        }

        this.joinRoom('default');
        this.getMessages('default');
        this.getChannels();
    };

    receiveMessage = (msg) => {
        let msgs = this.state.messages;
        if(JSON.parse(msg).channel === this.state.currentChannel){
            msgs.push(JSON.parse(msg));
            this.setState({messages : msgs});
            document.body.scrollTop = document.body.scrollHeight;
        } else {

            //deal with a message for a room we arent current viewing

        }

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
        console.log('try to scroll window');
        window.scrollTo(0,document.body.scrollHeight);
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

    componentDidUpdate = () => {
        console.log('chat update');
    };


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

export default withRouter(Chat);
