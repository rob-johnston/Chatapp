import React, { Component } from 'react';
import Chat from './Chat.jsx';




export default class ReactApp extends React.Component {



    render() {
        return (
            <div>
                <p> React App</p>
                <Chat />
            </div>
        );
    }

    test(){
            return <p>hello there</p>;
    }
}


