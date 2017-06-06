import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton'

class ChannelList extends React.Component {

    constructor(props){
        super(props);
    }

    handleSelectChannelClick = (e) => {
        e.preventDefault();
        console.log("link clicked");
    };



    renderChannelList = () => this.props.channels.map((channel) => {
        return (
            <div key = {channel.name}>
                <li>
                    <a href="#" onClick={this.handleSelectChannelClick}>
                        #{channel.name}
                    </a>
                </li>
            </div>
        );
    });

    render() {
        return (
            <div className="channelList">
                <div className="channelListHeader">
                    <div className="channelListHeaderTitle">
                        <h4>Channels</h4>
                    </div>
                    <div className="channelListHeaderButton">
                        <FlatButton
                            id="addChannelButton"
                            label="+"
                            type="submit"
                        />
                    </div>
                </div>
                <div>
                    <ul>
                        {this.renderChannelList()}
                    </ul>
                </div>
            </div>

        );
    }
}

export default ChannelList;
