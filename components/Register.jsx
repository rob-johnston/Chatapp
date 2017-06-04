import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class Register extends React.Component {

    constructor(){
        super();


        this.state = {
            username: '',
            password: '',
            registerURL :'/api/register',
            errorState: false
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
        this.register();
    }

    register = () => fetch(this.state.registerURL,
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
            //if successful save user and web token,
            //the same as a normal login really

        })
        .catch((err) => {
            //change error state, display already in use
            console.log(err);
        });



    render() {
        return (
            <div>
                <p>Register component</p>
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
                        label="register"
                    />

                </form>
                <p>already a member? Then<Link to="/login"> go to Login page </Link></p>
            </div>

        );
    }
}

export default Register;