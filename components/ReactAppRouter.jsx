import React, {Component} from 'react';
import Chat from './Chat.jsx';
import {HashRouter as Router, Route, Link} from 'react-router-dom';
import Login from './Login.jsx';
import Register from './Register.jsx';
import Container from './Container.jsx';
import MultiThemeProvider from 'material-ui/styles/MuiThemeProvider';



// //for being able to pass router to login
// const LoginWithProps = (props) => {
//     return(
//         <Login
//             router = {Router.history}
//         />
//     );
// };


class ReactAppRouter extends Component {

    render() {

        return (
            <MultiThemeProvider>
                <Router>
                    <div>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/login">login</Link></li>
                            <li><Link to="/register">Register</Link></li>
                        </ul>
                        <div>
                            <Route path="/" component ={Container} />
                            <Route path="/login" component = {Login} />
                            <Route path="/register" component = {Register} />
                            <Route path="/chat" component = {Chat} />
                        </div>
                    </div>
                </Router>
            </MultiThemeProvider>
        );
    }
}

export default ReactAppRouter