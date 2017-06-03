import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';


//Temporary Dependency for material-ui
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class Container extends Component {

    render() {
        return (
           <div>
                <p>Hi im a container</p>
            </div>
        );
    }
}

export default Container;
