import React, { Component } from 'react';

class UserList extends React.Component {

    constructor(props){
        super(props);

    }

    renderUserList = () => this.props.users.map((user,index) => {
        //if previous message is from same sender dont render the name
            return (
                <div className="individualUser" key={index}>
                    <li>
                        <a href="#" onClick={this.props.changeToPrivateMessageView}>
                            <p>{user}</p>
                        </a>
                    </li>
                </div>
            );
    });

    render() {
        return (
            <div className="userList"  id="userList">
                <h4>Online Users</h4>
                <div>
                    <ul>
                        {this.renderUserList()}
                    </ul>
                </div>
            </div>
        );
    }
}

export default UserList;