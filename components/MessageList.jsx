import React, { Component } from 'react';

class MessageList extends React.Component {

    constructor(props){
        super(props);
    }

    renderMessageList = () => this.props.messages.map((message) => {
        return (
            <div className="individualMessage" key = {message.timestamp}>
                <p>{message.user}</p>
                <p>{message.text}</p>
            </div>
        );
    });

    render() {
        return (
            <div>
                <p>MessageList component</p>
                <div>
                    {this.renderMessageList()}
                </div>
            </div>

        );
    }
}

export default MessageList;