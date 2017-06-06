import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class MessageList extends React.Component {

    constructor(props){
        super(props);
    }

    componentDidUpdate = () => {
       this.anchorMessage.focus();
       let elm = document.getElementById('messageList');
       elm.scrollTop = elm.scrollHeight;
    };

    componentDidMount = () => {
        const elm = ReactDOM.findDOMNode(this.anchorMessage);
        if(elm) {
            console.log('domelm found, trying to scroll');
            elm.scrollIntoView(false);
        }
    }

    renderMessageList = () => this.props.messages.map((message) => {
        return (
            <li key={message.timestamp}>
                <div className="individualMessage" key={message.timestamp}>
                    <p>{message.user}</p>
                    <p>{message.text}</p>
                </div>
            </li>
        );
    });

    render() {
        return (
            <div className="messageList" ref={(list) => {this.list = list}} id="messageList">
                <p>MessageList component</p>
                <div>
                    <ul>
                    {this.renderMessageList()}
                    </ul>
                    <div ref={(anchorMessage) => {this.anchorMessage = anchorMessage}}>
                </div>
                </div>
            </div>

        );
    }
}

export default MessageList;