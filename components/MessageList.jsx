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
    };

    renderMessageList = () => this.props.messages.map((message,index) => {


        //if previous message is from same sender dont render the name
        if(index>0 && this.props.messages[index-1].user === message.user){
            return (
                <div className="individualMessage" key={index}>
                    <li>
                        <div className ="messageLine">
                            <div className="timeStamp">
                                <p>{message.timestamp}</p>
                            </div>
                            <div className="messageText">
                                <p>{message.text}</p>
                            </div>
                        </div>
                    </li>
                </div>
            );
        } else {
            return (
                <div className="individualMessage" key={index}>
                    <li>
                        <div className="sender">
                            <p>{message.user}</p>
                        </div>
                        <div className="messageLine">
                            <div className="timeStamp">
                                <p>{message.timestamp}</p>
                            </div>
                            <div className="messageText">
                                <p>{message.text}</p>
                            </div>
                        </div>
                    </li>
                </div>
            );
        }
    });

    render() {
        return (
            <div className="messageList" ref={(list) => {this.list = list}} id="messageList">
                <p>{this.props.channel}</p>
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