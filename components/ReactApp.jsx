import React, { Component } from 'react';
import Chat from './Chat.jsx';
import {HashRouter, Route} from 'react-router-dom';
import Login from './Login.jsx';
import Register from './Register.jsx';
import Container from './Container.jsx';
import MultiThemeProvider from 'material-ui/styles/MuiThemeProvider';



export default class ReactApp extends Component {

    render() {

        return (
            <MultiThemeProvider>
                <div>
                    <HashRouter>
                        <div>
                            <Route path="/" component ={Container} />
                            <Route path="/Login" component = {Login} />
                            <Route path="/register" component = {Register} />
                            <Route path="/chat" component = {Chat} />
                        </div>
                    </HashRouter>
                </div>
            </MultiThemeProvider>
        );
    }
}


