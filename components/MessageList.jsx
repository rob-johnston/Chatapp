import React, { Component } from 'react';

class MessageList extends React.Component {

    constructor(props){
        super(props);
    }

    componentDidUpdate = () => {
        this.textInput.focus();
    };

    renderMessageList = () => this.props.messages.map((message) => {
        return (
            <li>
                <div className="individualMessage" key = {message.timestamp}>
                    <p>{message.user}</p>
                    <p>{message.text}</p>
                </div>
            </li>
        );
    });

    render() {
        return (
            <div className="messageList" ref={(list) => {this.list = list}}>
                <p>MessageList component</p>
                <div>
                    <ul>
                    {this.renderMessageList()}
                    </ul>
                </div>
                <div ref={(input) => {this.textInput = input}}>
                </div>
            </div>

        );
    }
}

export default MessageList;