import React, { Component } from 'react';

class Timer extends Component {   

    render() {
        const  seconds = this.props.seconds
        return (
            <div>
                <h1>Time Remaining: {seconds}</h1>
            </div>
        )
    }
}

export default Timer;