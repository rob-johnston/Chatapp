import React, { Component } from 'react';

class ChannelList extends React.Component {

    constructor(props){
        super(props);
    }

    renderChannelList = () => this.props.channels.map((channel) => {
        return (
            <div key = {channel.name}>
                <p>{channel.name}</p>
            </div>
        );
    });

    render() {
        return (
            <div>
                <p>ChannelList component</p>
                <div>
                    {this.renderChannelList()}
                </div>
            </div>

        );
    }
}

export default ChannelList;
