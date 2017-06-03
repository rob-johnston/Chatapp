import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class Login extends React.Component {

    constructor(){
        super();

        this.state = {
            username: '',
            password: ''
        }

    }

    onChangeUsername = (event) => {
        this.setState({username : event.target.value});
    }

    onChangePassword = (event) => {
        this.setState({password : event.target.value});
    }


    //make api auth call and store resulting web token if successful
    onSubmit = () => {
        this.signIn();
    }

    signIn = () => fetch('/api/auth',
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username : this.state.username,
                password : this.state.password,
            }),
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            //if successful assign user and token
            //navigate to chat page

        })
        .catch((err) => {
            console.log(err);
        });







    render() {
        return (
            <div>
                <p>Login component</p>
                <form onSubmit={this.onSubmit}>
                    <TextField
                        hintText="Username"
                        value={this.username}
                        label="Username"
                        onChange={this.onChangeUsername}
                        />
                    <TextField
                        type="password"
                        hintText="Password"
                        label="Login"
                        onChange={this.onChangePassword}
                        />
                   <RaisedButton
                        type="submit"
                        label="logon"
                   />

                </form>
                <p> if you aren't a member then<Link to="/register"> Register an account </Link></p>
            </div>
        );
    }
}

export default Login;